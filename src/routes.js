import { Router } from 'express';

import AutenticacaoController from './app/controllers/AutenticacaoController';
import EstudantesController from './app/controllers/EstudantesController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Autenticacao
routes.post('/autenticacao', AutenticacaoController.store);

routes.use(authMiddleware);

// Estudantes
routes.post('/estudantes', EstudantesController.store);
routes.put('/estudantes/:id', EstudantesController.update);

export default routes;
