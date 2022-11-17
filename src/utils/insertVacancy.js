const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.bqedr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insertVacancy(technologyName, vacancyNumber, companyNumber, typeTechnology) {
    try {
        const database = client.db('web');
        const movies = database.collection('vagas');
        await movies.insertOne({
            date: new Date(),
            technology: technologyName,
            vacancies: vacancyNumber,
            companies: companyNumber,
            type: typeTechnology
        });
    } catch (error) {
       throw error;
    }
}

const closeMongo = async () => await client.close();

module.exports = { insertVacancy, closeMongo }
