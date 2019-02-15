const express = require('express');
const router = express.Router();

var verificarToken = require('../util/verificarToken');
var controller = require('../controller/controller');

//Login do usuário na api
router.post('/login', controller.usuario.login);

//Login de Admin do Sistema
router.post('/loginAdmin', controller.usuario.loginAdmin);

module.exports = router;