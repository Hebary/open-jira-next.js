import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/db'
import { Entry, IEntry } from '../../../models';

type Data = 
|   { message: string }
|   IEntry;

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
        case 'DELETE':
            return deleteEntry(req, res);
        default:
            return res.status(400).json({ message: 'Inappropriate method' });
    }
}   


    const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        const { id } = req.query 
        try {
            await db.connect()
            const entryToUpdate = await Entry.findById(id)
            if( !entryToUpdate ) {
                await db.disconnect();  
                return res.status(400).json({ message: 'Entry not found' });
            } 
            // if there's an status or decription, i'll 
            //use them, else i'll use the previous
            const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

            const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators:true, new: true });
            await db.disconnect();
            res.status(200).json(updatedEntry!);

        } catch (error: any) {

            console.log(error);
            res.status(400).json({message: error.errors.status.message})
            await db.disconnect();
        }
    }

    const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => { 
        const { id } = req.query;
        await db.connect();
        const dbEntry = await Entry.findById(id);
        if( !dbEntry ) {
            await db.disconnect();
            return res.status(404).json({ message:'Entry not found' });
        }
        await db.disconnect();
        res.status(200).json(dbEntry);
    }

    const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
        const { id } = req.query;
        console.log({id})
        await db.connect()
        const dbEntry = await Entry.findById(id);
        if( !dbEntry ) {
            await db.disconnect();
            return res.status(400).json({message: 'Entry not found'});
        }
        await Entry.findByIdAndDelete(id)
        return res.status(200).json({message: 'Entry Delete Success'});        
    };