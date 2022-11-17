const fs = require('fs');
const path = require('path');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.bqedr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const closeMongo = async () => await client.close();


const getVacancies = async () => {
    try {
        const database = client.db('web');
        const vacancies = database.collection('vagas');

        const todayVacancies = await vacancies.find({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }}).toArray();

        await closeMongo();
        return todayVacancies;
    } catch (error) {
        console.log(error);
    }
}

const convertVacanciesToHTML = (vacancies) => {
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
                    ${vacancies.map(({ technology, vacancies, companies, date }) => {
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
                </tbody>
            </table>
        </body>
    </html>
    `
    return html;

}

const whiteHTMLFile = async (html) => {
    const filePath = path.join(__dirname, 'report.html');
    fs.writeFileSync(filePath, html);
}



const generateReport = async () => {
    try {
        const vacancies = await getVacancies();
        const html = convertVacanciesToHTML(vacancies);
        return html
        // whiteHTMLFile(html);
    } catch (error) {
        throw error;
    }
}

module.exports = { generateReport }