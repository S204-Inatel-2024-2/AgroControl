const express = require('express');
const receitaController = require('../controllers/receitasController');
const router = express.Router();

router.post('/', receitaController.createReceita);
router.get('/:id', receitaController.getReceitaById);
router.get('/', receitaController.getAllReceitas);
router.patch('/:id',receitaController.updateReceita);

module.exports = router;
