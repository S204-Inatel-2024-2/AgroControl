const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');
const router = express.Router();

router.post('/', funcionarioController.createFuncionario);
router.get('/:id', funcionarioController.getFuncionarioById);

module.exports = router;
