import Sequelize from 'sequelize';

import Usuarios from '../app/models/Usuarios';
import Estudantes from '../app/models/Estudantes';

import databaseConfig from '../config/database';

const models = [Usuarios, Estudantes];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
