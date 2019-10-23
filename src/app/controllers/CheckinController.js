import { Op } from 'sequelize';
import { addDays, format } from 'date-fns';
import Checkins from '../models/Checkins';
import Estudantes from '../models/Estudantes';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const checkins = await Checkins.findAll({
      where: { estudante_id: id },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;
    const limiteSemanal = 5;

    const estudante = await Estudantes.findByPk(id);

    if (!estudante) {
      return res.status(400).json({ error: 'Estudante não foi localizado!' });
    }

    const startDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss-03:00');
    const endDate = format(
      addDays(new Date(), -7),
      'yyyy-MM-dd HH:mm:ss-03:00'
    );

    const verificaCheckins = await Checkins.count({
      where: {
        estudante_id: id,
        created_at: {
          [Op.between]: [endDate, startDate],
        },
      },
    });

    if (verificaCheckins >= limiteSemanal) {
      return res.status(401).json({
        error: `Você não pode criar mais checkins, você atingiu o limite de ${limiteSemanal} Checkins!`,
      });
    }

    const checkin = await Checkins.create({
      estudante_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
