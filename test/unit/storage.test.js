'use strict';

const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {beforeEach, describe, it} = exports.lab = Lab.script();
const {default: Storage} = require('../../lib/storage');

describe('Storage', () => {
  let storage;

  beforeEach(async () => {
    storage = new Storage({
      debug: () => {}
    }, 1000);
  });

  it('can add application', () => {
    const group = 'group1';
    const app = 'app1';

    const res = storage.add({ group, id: app });
    expect(res.id).to.equal(app);
    expect(res.group).to.equal(group);
    expect(res.createdAt).to.be.date();
    expect(res.updatedAt).to.be.date();
  });

  it('can retrieve application', () => {
    const group = 'group1';
    const app = 'app1';

    const res = storage.add({ group, id: app });
    expect(res.id).to.equal(app);
    expect(res.group).to.equal(group);
    expect(res.createdAt).to.be.date();
    expect(res.updatedAt).to.be.date();

    const resRetrieve = storage.get({ group });
    expect(resRetrieve).to.be.array();
    expect(resRetrieve).to.have.length(1);

    expect(resRetrieve[0].id).to.equal(app);
    expect(resRetrieve[0].group).to.equal(group);
    expect(resRetrieve[0].createdAt).to.be.date();
    expect(resRetrieve[0].updatedAt).to.be.date();
  });

  it('can remove application', () => {
    const group = 'group1';
    const app = 'app1';

    const res = storage.add({ group, id: app });
    expect(res.id).to.equal(app);
    expect(res.group).to.equal(group);
    expect(res.createdAt).to.be.date();
    expect(res.updatedAt).to.be.date();

    const resRetrieve = storage.get({ group });
    expect(resRetrieve).to.be.array();
    expect(resRetrieve).to.have.length(1);

    expect(resRetrieve[0].id).to.equal(app);
    expect(resRetrieve[0].group).to.equal(group);
    expect(resRetrieve[0].createdAt).to.be.date();
    expect(resRetrieve[0].updatedAt).to.be.date();

    storage.remove({ group, id: app });

    const resRetrieve2 = storage.get({ group });
    expect(resRetrieve2).to.be.array();
    expect(resRetrieve2).to.have.length(0);
  });

  it('can get groups', () => {
    const group = 'group1';
    const app = 'app1';

    const res = storage.add({ group, id: app });
    expect(res.id).to.equal(app);
    expect(res.group).to.equal(group);
    expect(res.createdAt).to.be.date();
    expect(res.updatedAt).to.be.date();

    const resRetrieve = storage.getGroups();
    expect(resRetrieve).to.be.array();
    expect(resRetrieve).to.have.length(1);

    expect(resRetrieve[0].group).to.equal(group);
    expect(resRetrieve[0].createdAt).to.be.date();
    expect(resRetrieve[0].updatedAt).to.be.date();
    expect(resRetrieve[0].instances).to.equal(1);

    storage.remove({ group, id: app });

    // should not return groups with 0 instances
    const resRetrieve2 = storage.getGroups();
    expect(resRetrieve2).to.be.array();
    expect(resRetrieve2).to.have.length(0);
  });

  it('application information is deleted after timeout', async () => {
    const group = 'group1';
    const app = 'app1';

    const res = storage.add({ group, id: app });
    expect(res.id).to.equal(app);
    expect(res.group).to.equal(group);
    expect(res.createdAt).to.be.date();
    expect(res.updatedAt).to.be.date();

    const resRetrieve = storage.getGroups();
    expect(resRetrieve).to.be.array();
    expect(resRetrieve).to.have.length(1);

    return new Promise(function(resolve) {
      setTimeout(function() {
        const resRetrieve = storage.getGroups();
        expect(resRetrieve).to.be.array();
        expect(resRetrieve).to.have.length(0);
        resolve()
      }, 1100);
    })
  });
});
