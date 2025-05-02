const express = require('express');
const router = express.Router();
const { calcularScore } = require('../controllers/socialAnalysisController');

router.post('/fandometro', calcularScore);

module.exports = router;
