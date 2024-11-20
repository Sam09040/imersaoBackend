import ConectarAoBanco from '../config/dbConfig.js';
const cliente = await ConectarAoBanco(process.env.MONGO);

export const getTodosPosts = async () => {
    const db = cliente.db("imersao-instabyte");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

export default getTodosPosts;
