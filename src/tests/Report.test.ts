// import { VacancyType } from '../scrapping';
import Report from '../Report';
describe('Report', () => {
    it('should generate a report with the vacancies', async () => {
        const vacancies = [
            {
                technology: 'Node.js',
                vacancies: 1,
                companies: 1,
                date: new Date(),
                type: 'backend'
            },
            {
                technology: 'React',
                vacancies: 2,
                companies: 1,
                date: new Date(),
                type: 'web'
            }
        ];

        const report = new Report(vacancies);

        await report.generateHtmlReport();

        expect(report.reportHtml).toContain('Node.js');
        expect(report.reportHtml).toContain('React');
    });

    it('if vacancies is empty', async () => {
        const report = new Report([]);

        await report.generateHtmlReport();

       // espect exeption
       
       expect

    })
});