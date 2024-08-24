const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');
const router = express.Router();

router.post('/', funcionarioController.createFuncionario);

module.exports = router;
