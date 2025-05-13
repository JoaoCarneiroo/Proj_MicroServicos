const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './config/dados.db',
  logging: false
});

module.exports = sequelize;