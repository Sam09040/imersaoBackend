import { MongoClient } from "mongodb";

export default async function ConectarAoBanco(url) {
    try {
        const mongoClient = new MongoClient(url);
        console.log('Conectando ao cluster do banco de dados');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
        return mongoClient;
    } catch (error) {
        console.error('Falha na conexão com o banco!');
        process.exit();
    }
}
