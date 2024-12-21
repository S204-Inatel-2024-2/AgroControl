const express = require('express');
const funcionarioController = require('../controllers/funcionario');
const router = express.Router();

router.post('/', funcionarioController.createFuncionario);
router.get('/:id', funcionarioController.getFuncionarioById);
router.get('/', funcionarioController.getAllFuncionarios);
router.get('/:id/servicos', funcionarioController.getServicosByFuncionario);
router.put('/:id', funcionarioController.updateFuncionario);
router.delete('/:id', funcionarioController.deleteFuncionario);

module.exports = router;
