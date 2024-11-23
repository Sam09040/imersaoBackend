import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listarPosts, novoPost, uploadImagem, alterarPost } from '../controllers/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

export const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get('/posts', listarPosts);
    app.post('/posts', novoPost);
    app.post('/upload', upload.single('imagem'), uploadImagem);
    app.put('/upload/:id', alterarPost);
};

export default routes;
