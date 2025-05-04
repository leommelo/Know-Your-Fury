const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const interesseController = require('../controllers/interesseController');
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.post('/', userController.createUser);
router.get('/perfil', authenticate, userController.getUserById);
router.get('/', userController.getUsers);
router.post('/upload-imagem', authenticate, upload.single('foto'),userController.uploadImage );

module.exports = router;
