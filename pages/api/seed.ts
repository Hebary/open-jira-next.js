import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../db'
import { Entry } from '../../models'

type Data = {
    message: string
}


export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    if(process.env.NODE_ENV === 'production') {
       res.status(401).json({ message: "You don't have access to this service" })
    }
    try {
        await db.connect()
        
        await Entry.deleteMany();
        
        const { entries } = seedData;
        await Entry.insertMany(entries);

        await db.disconnect()
        res.status(200).json({ message: 'Successfull Process!' });
    } catch(error) {
        console.log(error)
    }
    
}