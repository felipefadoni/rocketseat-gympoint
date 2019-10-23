import Sequelize from 'sequelize';

import Usuarios from '../app/models/Usuarios';
import Estudantes from '../app/models/Estudantes';
import Planos from '../app/models/Planos';
import Matriculas from '../app/models/Matriculas';

import databaseConfig from '../config/database';

const models = [Usuarios, Estudantes, Planos, Matriculas];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
