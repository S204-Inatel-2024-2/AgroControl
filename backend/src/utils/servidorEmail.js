const dotenv = require('dotenv')
const nodemailer = require("nodemailer");
const AvisoCadastro = require("../utils/templatesEmail/AvisoCadastro");
const ServicoCancelado = require("../utils/templatesEmail/ServicoCancelado");
const ServicoFinalizado = require("../utils/templatesEmail/ServicoFinalizado");
const FuncionarioRemovido = require("../utils/templatesEmail/FuncionarioRemovido");
const TransferenciaServico = require("../utils/templatesEmail/TransferenciaServico");
const FuncionarioCadastrado = require("../utils/templatesEmail/FuncionarioCadastrado");
const AvisoServicoTransferido = require("../utils/templatesEmail/AvisoServicoTransferido");

dotenv.config();

// Cria o transporte utilizando MailDev como servidor SMTP
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD_EMAIL
  }
});

async function emailNovoFuncionario(funcionarioNovo) {
  const admin = { nome: "Administrador" };
  try {
    let info = await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: "Bem-vindo(a) à Equipe AgroControl",
      html: FuncionarioCadastrado(funcionarioNovo),
    });

    await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: "Novo Funcionário Cadastrado",
      html: AvisoCadastro(admin, funcionarioNovo),
    });

  } catch (error) {
    console.error("Erro ao enviar as noticações de email: ", error);
    throw error;
  }
}

async function emailFuncionarioRemovido(funcionario) {
  try {
    let info = await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: `Funcionário Removido: ${funcionario.nome}`,
      html: FuncionarioRemovido(funcionario),
    });

  } catch (error) {
    console.error("Erro ao enviar e-mail de remoção de funcionário: ", error);
    throw error;
  }
}

async function emailTransferenciaServico(dadosServico) {
  try {

    let infoFuncionario = await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: `Você foi atribuído a um novo serviço: ${dadosServico.servico}`,
      html: TransferenciaServico(dadosServico),
    });


    let infoAdmins = await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: `Transferência de Serviço: ${dadosServico.servico}`,
      html: AvisoServicoTransferido(dadosServico),
    });

  } catch (error) {
    console.error(`Erro ao enviar e-mail de transferência de serviço para ${dadosServico.servico}: `, error);
    throw error;
  }
}

async function emailServicoFinalizado(dadosServico) {
  try {
    let info = await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: `Finalização de Serviço: ${dadosServico.servico}`,
      html: ServicoFinalizado(dadosServico),
    });

  } catch (error) {
    console.error("Erro ao enviar e-mail de finalização de serviço: ", error);
    throw error;
  }
}

async function emailServicoCancelado(dadosServico) {
  try {
    let info = await transporter.sendMail({
      from: `agrocontroladm@gmail.com`,
      to: "agrocontrolusers@gmail.com",
      subject: `Cancelamento de Serviço: ${dadosServico.servico}`,
      html: ServicoCancelado(dadosServico),
    });

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


