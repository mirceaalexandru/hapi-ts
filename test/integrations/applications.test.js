'use strict';

const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {afterEach, beforeEach, describe, it} = exports.lab = Lab.script();
const {register} = require('../../lib/service/index');

describe('Applications can be added and retrieved', () => {
  let server;

  beforeEach(async () => {
    server = await register({service: {}});
  });

  afterEach(async () => {
    await server.stop();
  });

  it('can add application without meta', async () => {
    const group = 'group1';
    const app = 'app1';
    const res = await server.inject({
      method: 'post',
      url: `/${group}/${app}`,
      payload: {}
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.equal(app);
    expect(res.result.group).to.equal(group);
    expect(res.result.createdAt).to.be.date();
    expect(res.result.updatedAt).to.be.date();
  });

  it('can add application with meta', async () => {
    const group = 'group2';
    const app = 'app2';
    const res = await server.inject({
      method: 'post',
      url: `/${group}/${app}`,
      payload: {
        meta: {someData: 2}
      }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.equal(app);
    expect(res.result.group).to.equal(group);
    expect(res.result.createdAt).to.be.date();
    expect(res.result.updatedAt).to.be.date();
    expect(res.result.meta).to.equal({
      someData: 2
    });
  });

  it('can get list of applications in group', async () => {
    const group = 'group1';
    const app = 'app1';
    const res = await server.inject({
      method: 'post',
      url: `/${group}/${app}`,
      payload: {}
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.equal(app);
    expect(res.result.group).to.equal(group);
    expect(res.result.createdAt).to.be.date();
    expect(res.result.updatedAt).to.be.date();

    const resRetrieve = await server.inject({
      method: 'get',
      url: `/${group}`,
      payload: {
        meta: {someData: 2}
      }
    });

    expect(resRetrieve.statusCode).to.equal(200);
    expect(resRetrieve.result).to.be.array();
    expect(resRetrieve.result).to.have.length(1);

    expect(resRetrieve.result[0].id).to.equal(app);
    expect(resRetrieve.result[0].group).to.equal(group);
    expect(resRetrieve.result[0].createdAt).to.be.date();
    expect(resRetrieve.result[0].updatedAt).to.be.date();
    expect(resRetrieve.result[0].meta).to.be.undefined();
  });

  it('cannot add with invalid payload', async () => {
    const group = 'group1';
    const app = 'app1';
    const res = await server.inject({
      method: 'post',
      url: `/${group}/${app}`,
      payload: {
        something: 'wrong'
      }
    });

    expect(res.statusCode).to.equal(400);
  });
});

describe('Applications can be removed', () => {
  let server;

  beforeEach(async () => {
    server = await register({service: {}});
  });

  afterEach(async () => {
    await server.stop();
  });

  it('can add application', async () => {
    const group = 'group1';
    const app = 'app1';
    const res = await server.inject({
      method: 'post',
      url: `/${group}/${app}`,
      payload: {}
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.equal(app);
    expect(res.result.group).to.equal(group);
    expect(res.result.createdAt).to.be.date();
    expect(res.result.updatedAt).to.be.date();

    // now get application
    const resList1 = await server.inject({
      method: 'get',
      url: `/${group}`
    });

    expect(resList1.statusCode).to.equal(200);
    expect(resList1.result).to.be.array();
    expect(resList1.result).to.have.length(1);

    expect(resList1.result[0].id).to.equal(app);
    expect(resList1.result[0].group).to.equal(group);
    expect(resList1.result[0].createdAt).to.be.date();
    expect(resList1.result[0].updatedAt).to.be.date();
    expect(resList1.result[0].meta).to.be.undefined();

    const resRemove = await server.inject({
      method: 'delete',
      url: `/${group}/${app}`
    });

    expect(resRemove.statusCode).to.equal(204);

    // now get application
    const resList2 = await server.inject({
      method: 'get',
      url: `/${group}`
    });

    expect(resList2.statusCode).to.equal(200);
    expect(resList2.result).to.be.array();
    expect(resList2.result).to.have.length(0);
  });
});

describe('Groups are created and can be retrieved', () => {
  let server;

  beforeEach(async () => {
    server = await register({
      service: {}
    });
  });

  afterEach(async () => {
    await server.stop();
  });

  it('can add application and then retrieve group information', async () => {
    const group = 'group1';
    const app = 'app1';
    const app2 = 'app2';
    const res = await server.inject({
      method: 'post',
      url: `/${group}/${app}`,
      payload: {}
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.equal(app);
    expect(res.result.group).to.equal(group);
    expect(res.result.createdAt).to.be.date();
    expect(res.result.updatedAt).to.be.date();

    // can retrieve group information
    const resRetrieve1 = await server.inject({
      method: 'get',
      url: `/`
    });

    expect(resRetrieve1.statusCode).to.equal(200);
    expect(resRetrieve1.result).to.be.array();
    expect(resRetrieve1.result).to.have.length(1);
    expect(resRetrieve1.result[0].group).to.equal(group);
    expect(resRetrieve1.result[0].createdAt).to.be.date();
    expect(resRetrieve1.result[0].updatedAt).to.be.date();
    expect(resRetrieve1.result[0].instances).to.equal(1);

    // add another application to same group
    const resAdd = await server.inject({
      method: 'post',
      url: `/${group}/${app2}`,
      payload: {
        meta: {something: 1}
      }
    });

    expect(resAdd.statusCode).to.equal(200);
    expect(resAdd.result.id).to.equal(app2);
    expect(resAdd.result.group).to.equal(group);
    expect(resAdd.result.createdAt).to.be.date();
    expect(resAdd.result.updatedAt).to.be.date();

    // can retrieve group information
    const resRetrieve2 = await server.inject({
      method: 'get',
      url: `/`
    });

    expect(resRetrieve2.statusCode).to.equal(200);
    expect(resRetrieve2.result).to.be.array();
    expect(resRetrieve2.result).to.have.length(1);
    expect(resRetrieve2.result[0].group).to.equal(group);
    expect(resRetrieve2.result[0].createdAt).to.be.date();
    expect(resRetrieve2.result[0].updatedAt).to.be.date();
    expect(resRetrieve2.result[0].instances).to.equal(2);// 2 instances for this group
  });
});
