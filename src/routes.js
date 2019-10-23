import { Router } from 'express';

import AutenticacaoController from './app/controllers/AutenticacaoController';
import EstudantesController from './app/controllers/EstudantesController';
import MatriculasController from './app/controllers/MatriculasController';
import CheckinController from './app/controllers/CheckinController';
import EstudantesAjudasController from './app/controllers/EstudantesAjudasController';
import AjudasRespostasController from './app/controllers/AjudasRespostasController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Autenticacao
routes.post('/autenticacao', AutenticacaoController.store);

// Checkins
routes.get('/checkins/:id', CheckinController.index);
routes.post('/checkins/:id', CheckinController.store);

// Ajudas
routes.get('/estudantes/:id/ajudas', EstudantesAjudasController.index);
routes.post('/estudantes/:id/ajudas', EstudantesAjudasController.store);

routes.use(authMiddleware);

// Ajudas Respostas Academia
routes.get('/ajudas', AjudasRespostasController.index);
routes.put('/ajudas/:id', AjudasRespostasController.update);

// Estudantes
routes.post('/estudantes', EstudantesController.store);
routes.put('/estudantes/:id', EstudantesController.update);

// MATRICULAS
routes.get('/matriculas', MatriculasController.index);
routes.get('/matriculas/:id', MatriculasController.find);
routes.post('/matriculas', MatriculasController.store);
routes.put('/matriculas/:id', MatriculasController.update);

export default routes;
