import { Router } from 'express';

import AutenticacaoController from './app/controllers/AutenticacaoController';
import EstudantesController from './app/controllers/EstudantesController';
import MatriculasController from './app/controllers/MatriculasController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Autenticacao
routes.post('/autenticacao', AutenticacaoController.store);

routes.use(authMiddleware);

// Estudantes
routes.post('/estudantes', EstudantesController.store);
routes.put('/estudantes/:id', EstudantesController.update);

// MATRICULAS
routes.get('/matriculas', MatriculasController.index);
routes.get('/matriculas/:id', MatriculasController.find);
routes.post('/matriculas', MatriculasController.store);
routes.put('/matriculas/:id', MatriculasController.update);

export default routes;
