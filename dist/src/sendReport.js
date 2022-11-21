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
const nodemailer_1 = __importDefault(require("nodemailer"));
class Report {
    constructor(vacancies) {
        this.reportHtml = "";
        this.vacancies = vacancies;
    }
    generateHtmlReport() {
        return __awaiter(this, void 0, void 0, function* () {
            const html = `
    <html>
        <head>
            <title>Relatório de vagas</title>
        </head>
        
        <body>
            <h1>Relatório de vagas</h1>
            <table>
                <thead> 
                    <tr>
                        <th>Tecnologia</th>
                        <th>Vagas</th>
                        <th>Empresas</th>
                        <th>Data</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.vacancies.map(({ technology, vacancies, companies, date }) => {
                if (technology !== undefined) {
                    return `
                        <tr>
                            <td>${technology}</td>
                            <td>${vacancies}</td>
                            <td>${companies}</td>
                            <td>${date.toLocaleDateString('pt-BR')}</td>
                            <td>${date.toLocaleTimeString('pt-BR')}</td>
                        </tr>
                    `;
                }
            }).join('')}
            <img src="https://cdn.discordapp.com/attachments/1043562463108550796/1043579869654700152/giphy.gif" alt="this slowpoke moves"  width="250" alt="404 image"/>
                </tbody>
            </table>
            <style>
                body {  
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #000;
                    color: white;
                }
            </style>
        </body>
    </html>
    `;
            this.reportHtml = html;
        });
    }
    sendEmail({ html = "", subject = "", text = "" }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending email...');
            let transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "bruno.3av@gmail.com",
                    pass: "rzawijkbjqcgemqp", // generated ethereal password
                },
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
                from: '"Robo do Violamento 🤖" <foo@example.com>',
                to: "bruno.3av@gmail.com, leolang99@gmail.com, fabio.neto@ges.inatel.br, prodiodsignjac@gmail.com, georgel.jc98@gmail.com",
                subject: subject,
                text: text,
                html: html, // html body 
            });
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
    getReportHtml() {
        return this.reportHtml;
    }
}
exports.default = Report;
