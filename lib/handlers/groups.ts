import {GroupResponseInterface} from "../storage/interfaces/GroupInterface";
import {Request} from "@hapi/hapi";

export function getSummary(req: Request): GroupResponseInterface[] {
  return (<any>req.server).storage.getGroups(req.logger);
}
