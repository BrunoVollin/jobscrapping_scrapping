import { VacancyType } from '../scrapping';
import Report from '../Report';

const vacancies = [
    {
        technology: 'Node.js',
        vacancies: 10,
        companies: 5,
        date: new Date()
    },
    {
        technology: 'React',
        vacancies: 10,
        companies: 5,
        date: new Date()
    },
] as VacancyType[];

async function main() {
    const report = new Report(vacancies)
    await report.generateHtmlReport()
    const html = report.getReportHtml()
    console.log(html);
}

main();