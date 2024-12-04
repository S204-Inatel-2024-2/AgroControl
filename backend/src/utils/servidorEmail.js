const nodemailer = require("nodemailer");
const FuncionarioCadastrado = require("../utils/templatesEmail/FuncionarioCadastrado");
const AvisoCadastro = require("../utils/templatesEmail/AvisoCadastro");
const FuncionarioRemovido = require("../utils/templatesEmail/FuncionarioRemovido");
const TransferenciaServico = require("../utils/templatesEmail/TransferenciaServico");
const AvisoServicoTransferido = require("../utils/templatesEmail/AvisoServicoTransferido");
const ServicoFinalizado = require("../utils/templatesEmail/ServicoFinalizado");
const ServicoCancelado = require("../utils/templatesEmail/ServicoCancelado");

const admsEmails = [
    "iza@email.com", 
    "matheus@email.com", 
    "guilherme@email.com", 
    "juliely@email.com", 
    "marcio@email.com", 
    "joao@email.com"
];

// Cria o transporte utilizando MailDev como servidor SMTP
let transporter = nodemailer.createTransport({
  host: "127.0.0.1", // Força o uso de IPv4
  port: 1025, // Porta padrão do MailDev {http://127.0.0.1:1080/#/}
  secure: false, // Sem SSL/TLS
});

async function emailNovoFuncionario(funcionarioNovo) {
    const admin = { nome: "Administrador" };
    try {
    let info = await transporter.sendMail({
      from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
      to: `${funcionarioNovo.email}`,
      subject: "Bem-vindo(a) à Equipe AgroControl",
      html: FuncionarioCadastrado(funcionarioNovo),
    });

    console.log("Email de boas-vindas enviado: %s", info.messageId);

    await transporter.sendMail({
      from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
      to: admsEmails.join(","),
      subject: "Novo Funcionário Cadastrado",
      html: AvisoCadastro(admin,funcionarioNovo),
    });

    console.log("Notificação de novo funcionário enviada aos administradores.");
  } catch (error) {
    console.error("Erro ao enviar as noticações de email: ", error);
    throw error;
  }
}

async function emailFuncionarioRemovido(funcionario) {
  try {
    let info = await transporter.sendMail({
      from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
      to: admsEmails.join(","),
      subject: `Funcionário Removido: ${funcionario.nome}`,
      html: FuncionarioRemovido(funcionario),
    });

    console.log(
      "Notificação de remoção de funcionário enviada: %s",
      info.messageId
    );
  } catch (error) {
    console.error("Erro ao enviar e-mail de remoção de funcionário: ", error);
    throw error;
  }
}

async function emailTransferenciaServico(dadosServico) {
  try {
    console.log('email do novo funcionario: ',dadosServico.novoResponsavelEmail)
    
    let infoFuncionario = await transporter.sendMail({
      from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
      to: `${dadosServico.novoResponsavelEmail}`,
      subject: `Você foi atribuído a um novo serviço: ${dadosServico.servico}`,
      html: TransferenciaServico(dadosServico),
    });

    console.log("Notificação de transferência de serviço enviada ao funcionário: %s", infoFuncionario.messageId);
    

    let infoAdmins = await transporter.sendMail({
      from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
      to: admsEmails.join(","),
      subject: `Transferência de Serviço: ${dadosServico.servico}`,
      html: AvisoServicoTransferido(dadosServico),
    });

    console.log(
      "Notificação de transferência de serviço enviada aos administradores: %s",
      infoAdmins.messageId
    );

  } catch (error) {
    console.error(`Erro ao enviar e-mail de transferência de serviço para ${dadosServico.servico}: `, error);
    throw error;
  }
}

async function emailServicoFinalizado(dadosServico) {
    try {
        let info = await transporter.sendMail({
            from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
            to: admsEmails.join(","),
            subject: `Finalização de Serviço: ${dadosServico.servico}`,
            html: ServicoFinalizado(dadosServico),
        });

        console.log("Notificação de finalização de serviço enviada: %s", info.messageId);
    } catch (error) {
        console.error("Erro ao enviar e-mail de finalização de serviço: ", error);
        throw error;
    }
}

async function emailServicoCancelado(dadosServico) {
    try {
        let info = await transporter.sendMail({
            from: `Equipe de Gerência AgroControl <AgroControl@int.com>`,
            to: admsEmails.join(","),
            subject: `Cancelamento de Serviço: ${dadosServico.servico}`,
            html: ServicoCancelado(dadosServico), 
        });

        console.log("Notificação de cancelamento de serviço enviada: %s", info.messageId);
    } catch (error) {
        console.error("Erro ao enviar e-mail de cancelamento de serviço: ", error);
        throw error;
    }
}

module.exports = {
    emailNovoFuncionario,
    emailFuncionarioRemovido,
    emailTransferenciaServico,
    emailServicoFinalizado,
    emailServicoCancelado
};


