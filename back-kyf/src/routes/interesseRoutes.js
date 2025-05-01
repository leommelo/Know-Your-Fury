const express = require('express');
const router = express.Router();
const interesseController = require('../controllers/interesseController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, interesseController.createInteresse);
router.get('/', authenticate, interesseController.getInteresse);

module.exports = router;
