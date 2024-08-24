const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');
const router = express.Router();

router.post('/', funcionarioController.createFuncionario);
router.get('/:id', funcionarioController.getFuncionarioById);
router.get('/', funcionarioController.getAllFuncionarios);
router.put('/:id', funcionarioController.updateFuncionario);

module.exports = router;
