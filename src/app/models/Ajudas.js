import Sequelize, { Model } from 'sequelize';

class Ajudas extends Model {
  static init(sequelize) {
    super.init(
      {
        estudante_id: Sequelize.INTEGER,
        questao: Sequelize.TEXT,
        resposta: Sequelize.TEXT,
        data_resposta: Sequelize.DATE,
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

export default Ajudas;
