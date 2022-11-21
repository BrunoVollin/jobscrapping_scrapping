import nodemailer from "nodemailer";
import { VacancyType } from "./scrapping";

export default class Report {
    vacancies: VacancyType[];
    reportHtml: string = "";


    constructor(vacancies: VacancyType[]) {
        this.vacancies = vacancies;
    }

    async generateHtmlReport() {
        try {
            if (this.vacancies.length === 0) {
                throw new Error('No vacancies found');
            }

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
                    `}
            }).join('')

                }
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
    `
            this.reportHtml = html;
        } catch (error) {
            throw error;
        }

    }


    async sendEmail({ html = "", subject = "", text = "" }) {
        console.log('Sending email...');
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: "bruno.3av@gmail.com", 
                pass: "rzawijkbjqcgemqp", 
            },
        });

t
        let info = await transporter.sendMail({
            from: '"Robo do Violamento 🤖" <foo@example.com>', 
            to: "bruno.3av@gmail.com, leolang99@gmail.com, fabio.neto@ges.inatel.br, prodiodsignjac@gmail.com, georgel.jc98@gmail.com", 
            subject: subject, 
            text: text, 
            html: html, 
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    getReportHtml() {
        return this.reportHtml;
    }

}