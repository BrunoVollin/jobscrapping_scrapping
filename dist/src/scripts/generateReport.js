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
const Report_1 = __importDefault(require("../Report"));
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
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const report = new Report_1.default(vacancies);
        yield report.generateHtmlReport();
        const html = report.getReportHtml();
        console.log(html);
    });
}
main();
