import Sequelize, { Model } from 'sequelize';

class Checkins extends Model {
  static init(sequelize) {
    super.init(
      {
        estudante_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Estudantes, {
      foreignKey: 'estudante_id',
      as: 'estudante',
    });
  }
}

export default Checkins;
