const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const interesseController = require('../controllers/interesseController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

module.exports = router;
