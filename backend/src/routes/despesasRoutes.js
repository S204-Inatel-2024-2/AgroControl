const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');

router.post('/', despesasController.createDespesa);

module.exports = router;
