const express = require('express');
const despesasController = require('../controllers/despesasController');
const router = express.Router();
constDespesasController = require('../controllers/despesasController');

router.post('/despesas', despesasController.createDespesa);

module.exports = router;
