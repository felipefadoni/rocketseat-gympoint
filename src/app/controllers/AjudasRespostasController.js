import * as Yup from 'yup';
import Mail from '../../lib/Mail';
import Estudantes from '../models/Estudantes';
import Ajudas from '../models/Ajudas';

class AjudasRespostasController {
  async index(req, res) {
    const ajudasAbertas = await Ajudas.findAll({
      where: {
        resposta: null,
        data_resposta: null,
      },
    });
    return res.json(ajudasAbertas);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      resposta: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A resposta é obrigatória!' });
    }

    const { id } = req.params;
    const { resposta } = req.body;
    const ajuda = await Ajudas.findOne({
      where: { id },
      include: {
        model: Estudantes,
        as: 'estudante',
      },
    });

    ajuda.resposta = resposta;
    ajuda.data_resposta = new Date();
    await ajuda.save();

    await Mail.sendMail({
      to: `${ajuda.estudante.nome} <${ajuda.estudante.email}>`,
      subject: 'Resposta de sua Questão',
      template: 'ajuda',
      context: {
        nomeEstudante: ajuda.estudante.nome,
        pergunta: ajuda.questao,
        resposta: ajuda.resposta,
      },
    });

    return res.json(ajuda);
  }
}

export default new AjudasRespostasController();
