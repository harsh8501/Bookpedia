import { Request,Response } from "express";
import db from '../src/utils/db.server';

export const getAllBooks=async(req: Request, resp:Response)=>{
    try {
        const books = await db.book.findMany({
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select:{
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                },
            }
        })
        resp.status(200).json(books);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const getBookById=async(req: Request, resp:Response)=>{
    try {
        const book = await db.book.findUnique({
            where:{
               id: parseInt(req.params.id)
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select:{
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                },
            }
        })
        if(!book){
            return resp.status(404).json({ error: 'Book not found' });
        }
        resp.status(200).json(book);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const createBook=async(req:Request,resp:Response)=>{
    try {
        const { title, authorId, datePublished, isFiction } = req.body;
        const parsedDate: Date = new Date(datePublished);
        const newBook = await db.book.create({
            data:{
                title,
                authorId,
                isFiction,
                datePublished: parsedDate,
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select:{
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                },
            }
        })
        resp.status(201).json(newBook);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const updateBook=async(req:Request,resp:Response)=>{
    try {
        const { title, authorId, datePublished, isFiction } = req.body;
        const parsedDate: Date = new Date(datePublished);
        const id = req.params.id;
        const updatedBook = await db.book.update({
            where:{
                id:parseInt(id),
            },
            data:{
                title,
                authorId,
                datePublished: parsedDate,
                isFiction,
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select:{
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                },
            }
        })
        resp.status(200).json(updatedBook);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}

export const deleteBook=async(req:Request,resp:Response)=>{
    try {
        const id = req.params.id;
        const deletedBook = await db.book.delete({
            where:{
                id:parseInt(id),
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select:{
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                },
            }
        })
        resp.status(200).json(deletedBook);
    } catch (error: any) {
        resp.status(500).json({error: error.message});
    }
}