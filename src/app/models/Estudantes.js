import Sequelize, { Model } from 'sequelize';

class Estudantes extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        data_nascimento: Sequelize.DATE,
        peso: Sequelize.DECIMAL,
        altura: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Estudantes;
