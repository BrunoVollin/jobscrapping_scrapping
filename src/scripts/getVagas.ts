import Database from './../database';
import { writeAJson } from './../utils/writeAJson';

async function main() {
    const db = new Database();
    await db.connect();
    const vacancies = await db.getTodayVacancies();
    
    writeAJson(
        {
            fileName: "vacancies.json",
            path: "./src/data",
            data: vacancies
        }
    )
}

main();