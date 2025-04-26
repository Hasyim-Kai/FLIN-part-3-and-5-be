import { Request, Response } from 'express';
import prisma from '../prisma/client';


const getAll = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany()
    return res.status(200).json(data);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

export = { getAll, }