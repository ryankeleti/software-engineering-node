import { Request, Response, Express } from 'express';
import UserDao from '../daos/UserDao';
import UserControllerI from '../interfaces/UserControllerI';

export default class UserController implements UserControllerI {
  userDao: UserDao;

  constructor(app: Express, userDao: UserDao) {
    this.userDao = userDao;
    app.get('/users', this.findAllUsers);
    app.get('/users/:uid', this.findUserById);
    app.post('/users', this.createUser);
    app.delete('/users/:uid', this.deleteUser);
    app.put('/users/:uid', this.updateUser);
  }

  findAllUsers = (req: Request, res: Response) =>
    this.userDao.findAllUsers().then(users => res.json(users));

  findUserById = (req: Request, res: Response) =>
    this.userDao.findUserById(req.params.uid).then(user => res.json(user));

  createUser = (req: Request, res: Response) =>
    this.userDao.createUser(req.body).then(user => res.json(user));

  deleteUser = (req: Request, res: Response) =>
    this.userDao.deleteUser(req.params.uid).then(status => res.json(status));

  updateUser = (req: Request, res: Response) =>
    this.userDao.deleteUser(req.params.uid).then(status => res.json(status));
}

