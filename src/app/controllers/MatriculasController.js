import { format, addMonths, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Util from '../../helpers/Util';
import Mail from '../../lib/Mail';
import Matriculas from '../models/Matriculas';
import Estudantes from '../models/Estudantes';
import Planos from '../models/Planos';

class MatriculasController {
  async index(req, res) {
    const { pagina, limite } = req.query;

    const totalRegistros = await Matriculas.count({
      where: {
        data_termino: {
          [Op.gt]: format(new Date(), 'yyyy-MM-dd'),
        },
      },
    });

    const matriculas = await Matriculas.findAll({
      where: {
        data_termino: {
          [Op.gt]: format(new Date(), 'yyyy-MM-dd'),
        },
      },
      attributes: ['id', 'data_inicio', 'data_termino', 'valor'],
      limite,
      order: [['data_termino', 'ASC']],
      offset: (pagina - 1) * limite,
      include: [
        {
          model: Estudantes,
          as: 'estudante',
          attributes: ['id', 'nome', 'email', 'data_nascimento'],
        },
        {
          model: Planos,
          as: 'plano',
          attributes: ['id', 'titulo', 'duracao'],
        },
      ],
    });

    const totalPaginas = Math.ceil(totalRegistros / limite);

    const jsonRetorno = {
      pagina,
      limite,
      totalRegistros,
      totalPaginas,
      matriculas,
    };

    return res.json(jsonRetorno);
  }

  async find(req, res) {
    const { id } = req.params;
    const matricula = await Matriculas.findOne({
      where: { id },
      attributes: ['id', 'data_inicio', 'data_termino', 'valor'],
      include: [
        {
          model: Estudantes,
          as: 'estudante',
          attributes: ['id', 'nome', 'email'],
        },
        {
          model: Planos,
          as: 'plano',
          attributes: ['id', 'titulo'],
        },
      ],
    });
    return res.json(matricula);
  }

  async store(req, res) {
    const { usuarioTipo, usuarioId } = req;
    const { estudante_id, plano_id, data } = req.body;

    if (usuarioTipo !== 1) {
      return res.status(401).json({
        error: 'Você não possui permissão para realizar essa funcionalidade!',
      });
    }

    const estudante = await Estudantes.findByPk(estudante_id);
    const plano = await Planos.findByPk(plano_id);

    if (!estudante) {
      return res
        .status(400)
        .json({ error: 'Estudante não existe no banco de dados!' });
    }

    if (!plano) {
      return res.status(400).json({ error: 'Plano não foi localizado!' });
    }

    const dataAtual = format(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss');

    const matricula = await Matriculas.findAll({
      where: {
        estudante_id,
        data_termino: {
          [Op.gt]: dataAtual,
        },
      },
    });

    if (matricula.length > 0) {
      return res.status(400).json({
        error: 'Estudante já tem um plano ativo que não está vendico!',
      });
    }

    const data_termino = format(
      new Date(addMonths(new Date(data), plano.duracao)),
      'yyyy-MM-dd HH:mm:ss'
    );

    const data_inicio = format(parseISO(data), 'yyyy-MM-dd HH:mm:ss');

    const valor = plano.preco * plano.duracao;

    const matriculaCreated = await Matriculas.create({
      estudante_id,
      plano_id,
      data_inicio,
      data_termino,
      valor,
    });

    const valorReal = Util.toReal(valor);

    await Mail.sendMail({
      to: `${estudante.nome} <${estudante.email}>`,
      subject: 'Matrícula na GymPoint',
      template: 'matricula',
      context: {
        nomeEstudante: estudante.nome,
        dataInicial: format(parseISO(data_inicio), 'dd/MM/yyyy'),
        dataFinal: format(parseISO(data_termino), 'dd/MM/yyyy'),
        valorTotal: valorReal,
        meses: plano.duracao,
      },
    });

    return res.json(matriculaCreated);
  }

  async update(req, res) {
    const { id } = req.params;
    const matriculaUpdate = await Matriculas.findByPk(id);
    return res.json(matriculaUpdate);
  }
}

export default new MatriculasController();
