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

    const termo = "\"Smartphone Asus\""
    let filtro = {
        $text: {
            $search: termo,
        }
    }
    const opcoes = {
        sort: { preco: -1 },
        projection: { _id: 0,nome:0, preco:0,qtd_estoque:0,importado:0, desconto:0, id_prod:0}
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