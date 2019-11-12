import {Request, ResponseToolkit} from "@hapi/hapi";
import {ApplicationResponseInterface} from "../storage/interfaces/ApplicationInterface";

function post(req: Request): ApplicationResponseInterface {
  const { params: { group, id } } = req;
  const meta: object | undefined = req.payload ? (<any>req.payload).meta : null;

  return (<any>req.server).storage.add({group, id, meta});
}

function remove(req: Request, h: ResponseToolkit) {
  const { params: { group, id } } = req;

  (<any>req.server).storage.remove({group, id});
  return h.response().code(204);
}

function getAll(req: Request): ApplicationResponseInterface[] {
  const { params: { group } } = req;

  return (<any>req.server).storage.get({group});
}

module.exports = {
  post,
  remove,
  getAll
}