const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('planos', [
      {
        titulo: 'Start',
        duracao: 1,
        preco: 129,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        titulo: 'Gold',
        duracao: 3,
        preco: 109,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        titulo: 'Diamond',
        duracao: 6,
        preco: 89,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
