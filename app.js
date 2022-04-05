import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017,
}
const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (!client.db('admin').command({ "ping": 1 }))
        throw Error("Erro ao conectar ao banco !!")


    //Exemplo busca por frases, índice descricao
    const termo = "\"Smartphone Asus\""
    let filtro = {
        $text: {
            $search: termo,
        }
    }
    const opcoes = {
        sort: { preco: -1 },
        projection: { _id: 0,descricao:1}
    }

    // filtro = {}
    const collection = client.db('loja').collection('produtos')
    const resultados = await collection.find(filtro, opcoes).toArray()
    console.table(resultados)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}