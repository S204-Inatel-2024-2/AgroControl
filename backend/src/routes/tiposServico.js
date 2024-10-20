const express = require('express');
const router = express.Router();
const tiposServicoController = require('../controllers/tiposServico');

router.post('/', tiposServicoController.createTipoServico);
router.get('/', tiposServicoController.getAllTiposServico);
router.get('/:id', tiposServicoController.getTipoServico);
router.put('/:id', tiposServicoController.updateTipoServico);
router.delete('/:id', tiposServicoController.deleteTipoServico);

module.exports = router;
