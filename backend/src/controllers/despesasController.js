"use strict";
const { DespesasFuncionarios } = require("../services/despesasService");

const createDespesa = async (req, res) => {
  try {
    const { dataAtividade, valorGasto, status, serviceId, usersId } = req.body;
    const despesa = await DespesasFuncionarios.create({
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
