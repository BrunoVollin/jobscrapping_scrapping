import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { VacancyType } from './scrapping';
dotenv.config()


export default class Database {
    client: MongoClient | undefined;

    async connect() {
        const uri = process.env.DB_URI || "";
        this.client = new MongoClient(uri);
    }

    async close() {
        await this.client?.close();
    }

    async insertManyVacancies(vacancies: VacancyType[]) {
        const collection = await this.client?.db("web").collection("vagas");
        await collection?.insertMany(vacancies);
    }

    async getVacancies() {
        const collection = await this.client?.db("web").collection("vagas");
        return await collection?.find().toArray();
    }

    async getTodayVacancies(): Promise<VacancyType[]> {
        const collection = this.client?.db("web").collection("vagas");
        const vacancies = await collection?.find({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }).toArray() as unknown
        return vacancies as VacancyType[];
    }

    async getVacanciesOneHour() {
        const collection = await this.client?.db("web").collection("vagas");
        const vacancies = await collection?.find({ date: { $gte: new Date(new Date().setHours(new Date().getHours() - 1)) } }).toArray() as []
        const vacanciesIsEmpty = vacancies.length === 0;
        
        if (vacanciesIsEmpty) {
            throw new Error("Not found vacancies")
        }
        return vacancies as VacancyType[];
    }

}