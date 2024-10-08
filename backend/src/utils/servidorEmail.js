const nodemailer = require('nodemailer');
const emailFuncionarioCadastrado = require('../utils/templatesEmail/FuncionarioCadastrado')

// Cria o transporte utilizando MailDev como servidor SMTP
let transporter = nodemailer.createTransport({
    host: "127.0.0.1", // Força o uso de IPv4
    port: 1025,        // Porta padrão do MailDev
    secure: false,     // Sem SSL/TLS
});

async function emailnovoFuncionario(funcionarioNovo) {
    try {
        let info = await transporter.sendMail({
            from: `${funcionarioNovo.nome},'<${funcionarioNovo.email}>'`,
            to: `${funcionarioNovo.email}'`,
            subject: "Novo funcionário cadastrado",
            html: emailFuncionarioCadastrado(funcionarioNovo),
        });
        
        console.log("Email enviado: %s", info.messageId);
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        throw error;
    }
}

module.exports = { emailnovoFuncionario };
