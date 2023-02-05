import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry, IEntry } from '../../../models';
import { db } from '../../../db';


type Data = 
| { message: string }
| IEntry[] 
| IEntry 


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch  (req.method) {
        case 'GET':
            return {
                entries: getEntries( res )
            }
        case 'POST': 
            return {
                entries: addEntry( req, res )
            }
        default:
            return res.status(400).json({ message: "Bad request" })
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'asc' });
    await db.disconnect();
    res.status(200).json(entries);

}

const addEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { description = '' } = req.body;
    
    const newEntry = new Entry({
        description,
        createdAt: Date.now()
    });

    try {

        await db.connect();
        newEntry.save()
        .then( entry => {
            res.status(201).json(entry)});
        await db.disconnect();

    } catch( error ) {
        await db.disconnect();
        console.log( error );
        res.status(500).json({ message: "Internal server error" })
    }
}
