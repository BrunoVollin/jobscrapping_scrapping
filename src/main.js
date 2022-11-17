const puppeteer = require('puppeteer');
const { generateReport } = require('./utils/generateReport');
const { sendReportToEmail } = require('./utils/sendReportToEmail');
const { insertVacancy, closeMongo } = require('./utils/insertVacancy');
const { sendEmail } = require('./utils/sendEmail');

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

const getNumbersFromText = (text) => text.match(/\d+/g).map(Number);


async function searchVacancies(nameTechnology) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto('https://www.empregos.com.br/vagas');
        await page.type('#ctl00_ucSuggestCargo_txtCargo', nameTechnology);
        await page.click('#ctl00_lnkBuscar')
        await sleep(20000)
        let element = await page.$('.subtitulo')
        let value = await page.evaluate(el => el.textContent, element)
        await browser.close();

        const data = {
            "vacancies": getNumbersFromText(value)[0],
            "companies": getNumbersFromText(value)[1]
        }
        return data
    } catch (error) {
        throw error;
    }
};

async function main() {
    try {
        const technologies = [
            { name: "React Native", type: "mobile" },
            { name: "React", type: "web" },
            { name: "Node", type: "backend" },
            { name: "Flutter", type: "mobile" },
            { name: "Angular", type: "web" },
            { name: "Vue", type: "web" },
            { name: "Laravel", type: "backend" },
            { name: "Django", type: "backend" },
            { name: "Spring", type: "backend" },
            { name: "Express", type: "backend" },
            { name: "Ruby on Rails", type: "backend" },
            { name: "Ionic", type: "mobile" },
            { name: "ReactJS", type: "web" },
        ]

        for (const { name, type } of technologies) {
            console.log(`Buscando vagas para ${name}`);
            const data = await searchVacancies(name);
            console.log(data);
            await insertVacancy(name, data.vacancies, data.companies, type)
        }

        await closeMongo();
        await sendReportToEmail()
    } catch (error) {
        const stringError = JSON.stringify(error)
        await sendEmail({ subject: 'Erro ao gerar relatório', text: stringError });
    }

}

module.exports = { main }
