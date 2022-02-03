import {Request, Response, Express} from 'express';
import TuitDao from '../daos/TuitDao';
import TuitControllerI from '../interfaces/TuitControllerI';

export default class TuitController implements TuitControllerI {
  app: Express;
  TuitDao: TuitDao;

  constructor(app: Express, TuitDao: TuitDao) {
    this.app = app;
    this.TuitDao = TuitDao;
    this.app.get('/tuits', this.findAllTuits);
    this.app.get('/tuits/:tid', this.findTuitById);
    this.app.get('/tuits/:uid/tuits', this.findTuitsByUser);
    this.app.post('/tuits', this.createTuit);
    this.app.delete('/tuits/:tid', this.deleteTuit);
    this.app.put('/tuits/:tid', this.updateTuit);
  }

  findAllTuits = (req: Request, res: Response) =>
    this.TuitDao.findAllTuits().then(tuits => res.json(tuits));

  findTuitsByUser = (req: Request, res: Response) =>
    this.TuitDao.findTuitsByUser(req.parans.uid).then(tuits => res.json(tuits));

  findTuitById = (req: Request, res: Response) =>
    this.TuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));

  createTuit = (req: Request, res: Response) =>
    this.TuitDao.createTuit(req.body).then(tuit => res.json(tuit));

  deleteTuit = (req: Request, res: Response) =>
    this.TuitDao.deleteTuit(req.params.tid).then(status => res.json(status));

  updateTuit = (req: Request, res: Response) =>
    this.TuitDao.deleteTuit(req.params.tid).then(status => res.json(status));
}

