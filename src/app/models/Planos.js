import Sequelize, { Model } from 'sequelize';

class Planos extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        duracao: Sequelize.INTEGER,
        preco: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Planos;
