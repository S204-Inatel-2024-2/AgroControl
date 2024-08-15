// controllers/despesasController.js
const { DespesasFuncionarios, Services, Users } = require('../models/despesasModel');

const createDespesa = async (req, res) => {
  try {
    const { diaAtividade, valorGasto, serviceId, usersId } = req.body;

    // Validando se o serviço e o usuário existem
    const service = await Services.findByPk(serviceId);
    const user = await Users.findByPk(usersId);

    if (!service) {
      return res.status(400).json({ error: 'Serviço não encontrado' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Criando uma nova despesa
    const novaDespesa = await DespesasFuncionarios.create({
      diaAtividade,
      valorGasto,
      serviceId,
      usersId,
    });

    return res.status(201).json(novaDespesa);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};

module.exports = { createDespesa };
