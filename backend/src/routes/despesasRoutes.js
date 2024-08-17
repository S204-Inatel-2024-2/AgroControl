const express = require('express');
const despesasController = require('../controllers/despesasController');
const router = express.Router();

router.post('/', despesasController.createDespesa);

module.exports = router;
