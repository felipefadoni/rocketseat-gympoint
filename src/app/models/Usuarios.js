import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        tipo: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async usuario => {
      if (usuario.senha) {
        usuario.senha_hash = await bcryptjs.hashSync(usuario.senha, 8);
      }
    });

    return this;
  }

  checkPassword(senha) {
    return bcryptjs.compare(senha, this.senha_hash);
  }
}

export default Usuarios;
