const { Router } = require('express');

const { Controller } = require('../controllers/controller');

const routes = Router();

const controller = new Controller();

routes.get('/entrar', controller.entrar);

routes.get('/posts/:id', controller.detalhar);

routes.get('/posts', controller.listar);

routes.get('/sair', controller.sair);

routes.get('/posts/editar/:id', controller.editar);

routes.get('/', controller.index);


routes.post('/posts/:id', controller.alterar)

routes.post('/posts', controller.postar);

routes.post('/', controller.cadastrar);

module.exports = routes;