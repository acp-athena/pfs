const express = require('express');
const FilmeController = require('../controllers/filmeController');

let ctrl = new FilmeController();
 
let router = express.Router();
router.get('/',ctrl.listagemFilmeView);
router.get('/cadastrar',ctrl.cadastroFilmeView);
router.post('/cadastrar',ctrl.cadastrarFilme);
router.delete('/deletar/:id', ctrl.deletar);
router.get('/alterar/:id', ctrl.alterarView);
router.put('/alterar/:id', ctrl.editar);

module.exports = router;