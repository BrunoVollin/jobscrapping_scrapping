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
// import { VacancyType } from '../scrapping';
const Report_1 = __importDefault(require("../Report"));
describe('Report', () => {
    it('should generate a report with the vacancies', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const report = new Report_1.default(vacancies);
        yield report.generateHtmlReport();
        expect(report.reportHtml).toContain('Node.js');
        expect(report.reportHtml).toContain('React');
    }));
    it('if vacancies is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const report = new Report_1.default([]);
        yield report.generateHtmlReport();
        expect(report.reportHtml).toContain('Não foram encontradas vagas');
    }));
});
