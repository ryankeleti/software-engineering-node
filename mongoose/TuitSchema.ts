import mongoose from 'mongoose';
import Tuit from '../models/Tuit';

const TuitSchema = new mongoose.Schema({
  tuit: { type: String, required: true },
  postedBy: { type: String },
  postedOn: { type: Date, default: Date.now }
}, { collection: 'tuits' });

export default TuitSchema;

