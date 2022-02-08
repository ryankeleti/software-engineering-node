import express, {Request, Response} from 'express';
import mongoose from 'mongoose';

import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';

const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://tuiter-admin:${DB_PASSWORD}@cluster0.bfb6g.mongodb.net/tuiter-db?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome...'));

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());

const PORT = 4000;
app.listen(process.env.PORT || PORT);
