import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017,
}
const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (client.db('admin').command({ "ping": 1 }))
        console.log("Conectado!");
    else throw Error("Erro ao conectar ao banco !!")

    const termo = "LG"
    const filtro = {
        $text: {
            $search: termo,
        }
    }

    const opcoes = {
        sort: { preco: -1 },
        projection: { _id: 0,importado:0, qtd_estoque:0, descricao:0 }
    }

    const collection = client.db('loja').collection('produtos')
    collection.createIndex( { nome:"text" } )
    const resultados = await collection.find({}, opcoes).toArray()
    console.table(resultados)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}