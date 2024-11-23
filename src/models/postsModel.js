import { ObjectId } from 'mongodb';
import ConectarAoBanco from '../config/dbConfig.js';
import 'dotenv/config';
const cliente = await ConectarAoBanco(process.env.MONGO);
const db = cliente.db('imersao-instabyte');
const posts = db.collection('posts');

export const getTodosPosts = async () => {
    return posts.find().toArray();
};

export const criarPost = async (novoPost) => {
    return posts.insertOne(novoPost);
};

export const atualizarPost = async (id, post) => {
    const objId = ObjectId.createFromHexString(id);
    return posts.updateOne({ _id: new ObjectId(objId) }, { $set: post });
};
