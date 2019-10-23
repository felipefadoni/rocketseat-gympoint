module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('matriculas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      estudante_id: {
        type: Sequelize.INTEGER,
        references: { model: 'estudantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      plano_id: {
        type: Sequelize.INTEGER,
        references: { model: 'planos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_termino: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('matriculas');
  },
};
