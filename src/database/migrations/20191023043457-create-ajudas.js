module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ajudas', {
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
      questao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      resposta: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      data_resposta: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('ajudas');
  },
};
