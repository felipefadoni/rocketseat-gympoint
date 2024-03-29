import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Token não informado na requisição!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.usuarioId = decoded.id;
    req.usuarioTipo = decoded.tipo;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido!' });
  }
};
