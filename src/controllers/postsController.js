import fs from 'fs';
import { getTodosPosts, criarPost } from "../models/postsModel.js";

export const listarPosts = async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

export const novoPost = async (req, res) => {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Falha na requisição' });
    };
};

export const uploadImagem = async (req, res) => {
    const novoPost = {
        descricao: '',
        imgUrl: req.file.originalname,
        alt: ''
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Falha na requisição' });
    };
};
