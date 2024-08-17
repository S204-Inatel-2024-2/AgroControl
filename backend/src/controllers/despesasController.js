"use strict";
const { DespesaFuncionario } = require("../db/models/despesasfuncionarios");

const createDespesa = async (req, res) => {
  try {
    const { dataAtividade, valorGasto, status, serviceId, usersId } = req.body;
    const despesa = await DespesaFuncionario.create({
      dataAtividade,
      valorGasto,
      status,
      serviceId,
      usersId
    });
    res.status(201).json(despesa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDespesa,
};
