const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.bqedr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
    try {
        const database = client.db('web');
        const movies = database.collection('vagas'); 
    } catch (error) {
        console.log(error);
    }
}

const closeMongo = async () => await client.close();

main()