import express from "express"
const movieRouter = express.Router()

import { addMovie, addGenre, getMovie, updateMovie, deleteMovie } from "../controllers/movie.controller.js"
import { authorized, verifyToken } from "../config/auth.js";
import upload from "../middlewares/multer.js";

movieRouter.post('/add-movie', verifyToken, authorized(['admin']), upload.single('poster'), addMovie);
movieRouter.post('/add-genre', verifyToken, authorized(['admin']), addGenre);
movieRouter.get('/get-movie', verifyToken, getMovie);
movieRouter.put('/update-movie/:id', verifyToken, authorized(['admin']), upload.single('poster'), updateMovie);
movieRouter.delete('/delete-movie/:id', verifyToken, authorized(['admin']), deleteMovie)

export default movieRouter;