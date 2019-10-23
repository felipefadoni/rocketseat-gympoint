import Sequelize, { Model } from 'sequelize';

class Matriculas extends Model {
  static init(sequelize) {
    super.init(
      {
        estudante_id: Sequelize.INTEGER,
        plano_id: Sequelize.INTEGER,
        data_inicio: Sequelize.DATE,
        data_termino: Sequelize.DATE,
        valor: Sequelize.DECIMAL,
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
    this.belongsTo(models.Planos, {
      foreignKey: 'plano_id',
      as: 'plano',
    });
  }
}

export default Matriculas;
