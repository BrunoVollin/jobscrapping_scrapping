const puppeteer = require('puppeteer');

async function sleep(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

const getNumbersFromText = (text: string): number[] => {
    const obj = text.match(/\d+/g);
    if (obj) return obj.map(Number)
    return [
        0,
        0
    ];
};

export type VacancyType = {
    date: Date,
    vacancies: number
    companies: number
    type: string
    technology: string
}

export default class Scrapping {
    page: any;
    vacancies: VacancyType[] = [];

    async connect() {
        try {
            const browser = await puppeteer.launch({
            });
            this.page = await browser.newPage();
        } catch (error) {
            throw error;
        }
    }

    async searchVacancies({ nameTechnology, type }: { nameTechnology: string, type: string }) {
        try {
            await this.page.goto('https://www.empregos.com.br/vagas');
            await this.page.type('#ctl00_ucSuggestCargo_txtCargo', nameTechnology);
            await this.page.click('#ctl00_lnkBuscar')
            await sleep(10000)
            let element = await this.page.$('.subtitulo')
            let value: any = await this.page.evaluate((el: any) => el.textContent, element)

            const resultData = {
                "vacancies": getNumbersFromText(value)[0],
                "companies": getNumbersFromText(value)[1],
                "type": type,
                "technology": nameTechnology,
                "date": new Date()
            }
            this.vacancies.push(resultData)
        } catch (error) {
            throw error;
        }
    }

    get getVacancies() {
        return this.vacancies;
    }
}
