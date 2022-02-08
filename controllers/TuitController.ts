import { Request, Response, Express } from 'express';
import TuitDao from '../daos/TuitDao';
import TuitControllerI from '../interfaces/TuitControllerI';

export default class TuitController implements TuitControllerI {
  TuitDao: TuitDao;

  constructor(app: Express, TuitDao: TuitDao) {
    this.TuitDao = TuitDao;
    app.get('/tuits', this.findAllTuits);
    app.get('/tuits/:tid', this.findTuitById);
    app.get('/tuits/:uid/tuits', this.findTuitsByUser);
    app.post('/tuits', this.createTuit);
    app.delete('/tuits/:tid', this.deleteTuit);
    app.put('/tuits/:tid', this.updateTuit);
  }

  findAllTuits = (req: Request, res: Response) =>
    this.TuitDao.findAllTuits().then(tuits => res.json(tuits));

  findTuitsByUser = (req: Request, res: Response) =>
    this.TuitDao.findTuitsByUser(req.params.uid).then(tuits => res.json(tuits));

  findTuitById = (req: Request, res: Response) =>
    this.TuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));

  createTuit = (req: Request, res: Response) =>
    this.TuitDao.createTuit(req.body).then(tuit => res.json(tuit));

  deleteTuit = (req: Request, res: Response) =>
    this.TuitDao.deleteTuit(req.params.tid).then(status => res.json(status));

  updateTuit = (req: Request, res: Response) =>
    this.TuitDao.deleteTuit(req.params.tid).then(status => res.json(status));
}

