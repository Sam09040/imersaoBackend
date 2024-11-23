import ConectarAoBanco from '../config/dbConfig.js';
const cliente = await ConectarAoBanco(process.env.MONGO);
const db = cliente.db('imersao-instabyte');
const posts = db.collection('posts');

export const getTodosPosts = async () => {
    return posts.find().toArray();
};

export const criarPost = async (novoPost) => {
    return posts.insertOne(novoPost);
};
