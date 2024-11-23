import fs from 'fs';
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from '../services/geminiService.js';

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

export const alterarPost = async (req, res) => {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl,
            descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Falha na requisição' });
    }
};
