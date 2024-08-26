const express = require('express');
const router = express.Router();
const ServicosController = require('../controllers/servicosController');

router.get('/', ServicosController.listarServicos);
router.get('/:id', ServicosController.obterServico);
router.post('/', ServicosController.criarServico);
router.put('/:id', ServicosController.atualizarServico);
router.delete('/:id', ServicosController.deletarServico);

module.exports = router;