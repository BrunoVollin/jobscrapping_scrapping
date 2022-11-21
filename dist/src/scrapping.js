"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require('puppeteer');
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, ms));
    });
}
const getNumbersFromText = (text) => {
    const obj = text.match(/\d+/g);
    if (obj)
        return obj.map(Number);
    return [
        0,
        0
    ];
};
class Scrapping {
    constructor() {
        this.vacancies = [];
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const browser = yield puppeteer.launch({});
                this.page = yield browser.newPage();
            }
            catch (error) {
                throw error;
            }
        });
    }
    searchVacancies({ nameTechnology, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.goto('https://www.empregos.com.br/vagas');
                yield this.page.type('#ctl00_ucSuggestCargo_txtCargo', nameTechnology);
                yield this.page.click('#ctl00_lnkBuscar');
                yield sleep(10000);
                let element = yield this.page.$('.subtitulo');
                let value = yield this.page.evaluate((el) => el.textContent, element);
                const resultData = {
                    "vacancies": getNumbersFromText(value)[0],
                    "companies": getNumbersFromText(value)[1],
                    "type": type,
                    "technology": nameTechnology,
                    "date": new Date()
                };
                this.vacancies.push(resultData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    get getVacancies() {
        return this.vacancies;
    }
}
exports.default = Scrapping;
