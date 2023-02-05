import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '../interfaces';


export interface IEntry extends Entry {};


const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number },
    status:{
        type: String,
        enum:{ 
            values: ['pending', 'in-progress', 'finished'],
            message:`{VALUE} is not a valid status`
        },
        default: 'pending'
    }   
})

//When runs for the first time there is no model, 
// so it creates one, but then for future cases it 
// will use the model created, this way it create the model just once.

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);
 
export default EntryModel