const express = require('express');
const servicesController = require('../controllers/servicesController');
const router = express.Router();

router.post('/', servicesController.createService);

module.exports = router;
