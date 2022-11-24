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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const scrapping_1 = __importDefault(require("./scrapping"));
const Report_1 = __importDefault(require("./Report"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            ];
            const scrapping = new scrapping_1.default();
            yield scrapping.connect();
            for (const technology of technologies) {
                console.log(`Searching vacancies for ${technology.nameTechnology}...`);
                yield scrapping.searchVacancies(technology);
                console.log(`Vacancies for ${technology.nameTechnology} found!`);
            }
            const vacancies = scrapping.getVacancies;
            const database = new database_1.default();
            yield database.connect();
            yield database.insertManyVacancies(vacancies);
            const vacanciestoday = yield database.getVacanciesOneHour();
            console.log({ vacanciestoday });
            const report = new Report_1.default(vacanciestoday);
            yield report.generateHtmlReport();
            const html = report.getReportHtml();
            console.log({ html });
            const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
            yield report.sendEmail({
                html,
                subject: `Relatório de vagas ${today}`,
                text: `Relatório de vagas ${today}`
            });
            yield database.close();
        }
        catch (error) {
            const report = new Report_1.default([]);
            const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
            console.log(error);
            yield report.sendEmail({
                subject: `Relatório de vagas ${today}`,
                text: `Relatório de vagas ${today}`
            });
        }
    });
}
exports.default = main;
