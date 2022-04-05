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
    
    //Exemplo de uso da sensibilidade quanto á maiusculo ou minísculo
    //Retornará apenas os produtos com a palavra Samsumg escrita exatamente igual ao termo
    const termo = "Samsumg"
    let filtro = {
        $text: {
            $search: termo,
            $caseSensitive:true
        }
    }


    //Exemplo de uso da sensibilidade diacritica
    //Retornará apenas os produtos com a palavra reclinável com acento
    // const termo = "reclinável"
    // let filtro = {
    //     $text: {
    //         $search: termo,
    //         $diacriticSensitive:true
    //     }
    // }

    
    //Exemplo de exclusão de termo
    //Retornará todos os produtos com a palavra Smartphone,
    //exceto aqueles com o termo samsumg
    // const termo = "Smartphone -samsumg"
    // let filtro = {
    //     $text: {
    //         $search: termo,
    //     }
    // }

    // //Exemplo busca por frases, índice descricao
    // const termo = "\"Smartphone Asus\""
    // let filtro = {
    //     $text: {
    //         $search: termo,
    //     }
    // }
    const opcoes = {
        sort: { preco: -1 },
        projection: { _id: 0, descricao: 1 }
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