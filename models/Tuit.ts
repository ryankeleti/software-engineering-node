import User from './User';

export default class Tuit {
  tuit: string = '';
  postedOn: Date = new Date();
  postedBy: User | null = null;
}

