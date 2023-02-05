// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  method: string
  message: string
  secret?: string
}


// this only runs in server side, backend. client has no way to see this information

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(process.env)

  res.status(200).json({ 
    name: 'John Doe',
    method : req.method || 'No Method',
    message: 'Everything is good',
    secret: process.env.MONGO_URI
  })
}
