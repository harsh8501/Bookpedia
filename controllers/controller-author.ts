import {Request,Response} from 'express';
import db from '../src/utils/db.server'

export const getAllAuthor = async (_req: Request, resp: Response)=>{
    try {
        const authors = await db.author.findMany();
        resp.status(200).json(authors);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const getAuthorById = async (req: Request, resp: Response)=>{
    try {
        const author = await db.author.findUnique({
            where:{
                id: parseInt(req.params.id),
            },
            select:{
                id: true,
                firstName: true,
                lastName: true,
            }
        });
        if(!author){
            return resp.status(404).json({ error: 'Author not found' });
        }
        resp.status(200).json(author);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const createAuthor=async(req:Request,resp:Response)=>{
    try {
        const { firstName, lastName, phone } = req.body;
        const newAuthor = await db.author.create({
            data:{
                firstName:firstName,
                lastName:lastName,
                phone: phone,
            }
        })
        resp.status(201).json(newAuthor);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const updateAuthor=async(req:Request,resp:Response)=>{
    try {
        const { firstName, lastName } = req.body;
        const id = req.params.id;
        console.log(id,firstName,lastName);
        const updatedAuthor = await db.author.update({
            where:{
                id:parseInt(id),
            },
            data:{
                firstName:firstName,
                lastName:lastName,
            },
            select:{
                id: true,
                firstName: true,
                lastName: true,
            }
        })
        resp.status(200).json(updatedAuthor);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const deleteAuthor=async(req:Request,resp:Response)=>{
    try {
        const id = req.params.id;
        const deletedAuthor = await db.author.delete({
            where:{
                id:parseInt(id),
            },
            select:{
                id: true,
                firstName: true,
                lastName: true,
            }
        })
        resp.status(200).json(deletedAuthor);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}