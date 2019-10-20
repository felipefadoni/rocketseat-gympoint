import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import Usuarios from '../models/Usuarios';

class AutenticacaoController {
  async store(req, res) {
    const schemaRequest = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await schemaRequest.isValid(req.body))) {
      return res.status(400).json({ error: 'Email e Senha são obrigatórios!' });
    }

    const { email, senha } = req.body;

    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não localizado!' });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Senha não confere!' });
    }

    const { id, nome, tipo } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id, tipo }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AutenticacaoController();
