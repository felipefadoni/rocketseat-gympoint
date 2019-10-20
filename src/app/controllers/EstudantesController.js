import * as Yup from 'yup';
import Estudantes from '../models/Estudantes';

class EstudantesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      data_nascimento: Yup.date().required(),
      peso: Yup.string().required(),
      altura: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Erro ao validar os dados, preencha todos os dados corretamente!',
      });
    }

    const { nome, email, data_nascimento, peso, altura } = req.body;

    const checkEstudante = await Estudantes.findOne({
      where: { email },
    });

    if (checkEstudante) {
      return res.status(401).json({
        error: 'Já existe um estudante com este email registrado.',
      });
    }

    const estudante = await Estudantes.create({
      nome,
      email,
      data_nascimento,
      peso,
      altura,
    });

    return res.json(estudante);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      data_nascimento: Yup.date().required(),
      peso: Yup.string().required(),
      altura: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Erro ao validar os dados, preencha todos os dados corretamente!',
      });
    }

    const { nome, email, data_nascimento, peso, altura } = req.body;

    const estudante = await Estudantes.findByPk(req.params.id);

    estudante.nome = nome;
    estudante.email = email;
    estudante.data_nascimento = data_nascimento;
    estudante.peso = peso;
    estudante.altura = altura;

    await estudante.save();

    return res.json(estudante);
  }
}

export default new EstudantesController();
