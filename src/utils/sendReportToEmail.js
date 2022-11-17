const { generateReport } = require('./generateReport')
const { sendEmail } = require('./sendEmail')
const fs = require('fs');



const sendReportToEmail = async () => {
    try { 
        const html = await generateReport();
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        await sendEmail({ html, subject: 'Relatório de vagas ' + dataAtual});

    } catch (error) {
        throw error;
    }
}

module.exports = { sendReportToEmail };
