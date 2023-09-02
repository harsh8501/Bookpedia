import express from 'express';
import { getAllAuthor,getAuthorById,createAuthor,updateAuthor,deleteAuthor } from '../controllers/controller-author';
import { getAllBooks,getBookById,createBook,deleteBook,updateBook } from '../controllers/controller-book';

const route = express.Router();

//Author Routes
route.get('/author/',getAllAuthor);
route.get('/author/:id',getAuthorById);
route.post('/author/createAuthor',createAuthor);
route.put('/author/updateAuthor/:id',updateAuthor);
route.delete('/author/deleteAuthor/:id',deleteAuthor);


//Book Routes
route.get('/book/',getAllBooks);
route.get('/book/:id',getBookById);
route.post('/book/createBook',createBook);
route.put('/book/updateBook/:id',updateBook);
route.delete('/book/deleteBook/:id',deleteBook);

export default route;