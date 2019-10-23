import * as Yup from 'yup';
import Ajudas from '../models/Ajudas';

class EstudantesAjudasController {
  async index(req, res) {
    const { id } = req.params;
    const ajudasEstudante = await Ajudas.findAll({
      where: {
        estudante_id: id,
      },
    });
    return res.json(ajudasEstudante);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      questao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A questão é obrigatória!' });
    }

    const { id } = req.params;
    const { questao } = req.body;

    const ajuda = await Ajudas.create({
      estudante_id: id,
      questao,
    });

    return res.json(ajuda);
  }
}

export default new EstudantesAjudasController();
