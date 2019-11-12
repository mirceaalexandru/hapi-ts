import {Logger} from "pino";
import {ApplicationInterface, ApplicationResponseInterface} from './interfaces/ApplicationInterface';
import {GroupInterface, GroupResponseInterface} from "./interfaces/GroupInterface";

export default class Storage {
  logger: Logger;
  groups: {[index: string]: GroupInterface};
  ttl: number;

  constructor (logger: Logger, ttl: number) {
    this.logger = logger;
    this.groups = {};
    this.ttl = ttl;
  }

  add({group, id, meta}: { group: string, id: string, meta: object | undefined }): ApplicationResponseInterface {
    this.logger.debug({group, id}, 'Adding application information');

    let app: ApplicationInterface | null = null;
    this.groups[group] = this.groups[group] || {
      createdAt: new Date(),
      updatedAt: new Date(),
      instances: []
    };

    this.groups[group].instances
      .forEach((currentApp: ApplicationInterface) => {
        if (currentApp.id === id) {
          currentApp.updatedAt = new Date();
          currentApp.meta = meta;
          clearTimeout(currentApp.timeout);
          currentApp.timeout = setTimeout(() => {
            this.remove({group, id})
          }, this.ttl),
          app = currentApp
        }
      })

    if (app === null) {
      // not found, just add it
      app = {
        id,
        group,
        meta,
        timeout: setTimeout(() => {
          this.remove({group, id})
        }, this.ttl),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      this.groups[group].instances.push(app);
    }

    return {
      id: app.id,
      group: app.group,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      meta: app.meta
    };
  }

  get(
    {group}: { group: string }
  ): ApplicationResponseInterface[] | null {

    this.logger.debug({group}, 'Get application information');

    return this.groups[group] ?
      this.groups[group].instances
        .map(inst => {
          const res = {
            ...inst
          }
          delete res.timeout;
          return res;
        }):
      [];
  }

  getGroups(): GroupResponseInterface[] {
    this.logger.debug('Get group information');

    return Object.keys(this.groups)
      .map(group => {
        return {
          createdAt: this.groups[group].createdAt,
          updatedAt: this.groups[group].updatedAt,
          group,
          instances: this.groups[group].instances.length
        }
      })
      .filter(group => group.instances)
  }

  remove({group, id}: { group: string, id: string }): null {
    this.logger.debug({group, id}, 'Deleting application information');

    if (this.groups[group]) {
      this.groups[group].instances = this.groups[group].instances
        .filter((inst: ApplicationInterface) => {
          if (inst.id === id) {
            clearTimeout(inst.timeout);
            return false;
          }
          return true;
        });
    }

    return null;
  }

  close(): void {
    Object.keys(this.groups)
      .forEach(groupKey => {
        this.groups[groupKey]
          .instances
          .forEach(inst => {
            clearTimeout(inst.timeout)
          })
      })
  }
}