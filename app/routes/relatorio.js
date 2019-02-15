const express = require('express');
const router = express.Router();

var verificarToken = require('../util/verificarToken');
var controller = require('../controller/controller');

router.get('/relatorios/vendas', controller.relatorio.venda);

module.exports = router;