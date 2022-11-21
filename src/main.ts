import Database from "./database";
import Scrapping from "./scrapping";
import Report from "./sendReport";


export default async function main() {
    try {
        const technologies = [
            { nameTechnology: "React Native", type: "mobile" },
            { nameTechnology: "React", type: "web" },
            { nameTechnology: "Node", type: "backend" },
            { nameTechnology: "Flutter", type: "mobile" },
            { nameTechnology: "Angular", type: "web" },
            { nameTechnology: "Vue", type: "web" },
            { nameTechnology: "Laravel", type: "backend" },
            { nameTechnology: "Django", type: "backend" },
            { nameTechnology: "Spring", type: "backend" },
            { nameTechnology: "Express", type: "backend" },
            { nameTechnology: "Ruby on Rails", type: "backend" },
            { nameTechnology: "Ionic", type: "mobile" },
            { nameTechnology: "ReactJS", type: "web" },
        ]

        const scrapping = new Scrapping();
        await scrapping.connect();

        for (const technology of technologies) {
            console.log(`Searching vacancies for ${technology.nameTechnology}...`);
            await scrapping.searchVacancies(technology);
            console.log(`Vacancies for ${technology.nameTechnology} found!`);
        }
        const vacancies = scrapping.getVacancies;

        const database = new Database();
        await database.connect();
        await database.insertManyVacancies(vacancies);
        const vacanciestoday = await database.getVacanciesOneHour();
        console.log({ vacanciestoday });


        const report = new Report(vacanciestoday)
        await report.generateHtmlReport()
        const html = report.getReportHtml()
        console.log({ html });

        const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        await report.sendEmail({
            html,
            subject: `Relatório de vagas ${today}`,
            text: `Relatório de vagas ${today}`
        })

        await database.close();
    } catch (error) {
        const report = new Report([]);
        const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        console.log(error);
        await report.sendEmail({
            subject: `Relatório de vagas ${today}`,
            text: `Relatório de vagas ${today}`
        })
    }
}
