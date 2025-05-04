const express = require('express');
const router = express.Router();
const { calcularScore } = require('../controllers/socialAnalysisController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/fandometro',authenticate, calcularScore);

module.exports = router;
