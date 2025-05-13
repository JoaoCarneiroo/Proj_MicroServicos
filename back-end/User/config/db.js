const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db',  // Nome do serviço do banco no Docker Compose
  port: 5432,
  database: 'microservicos',
  username: 'joaomiko',
  password: 'joaogoodman',
});


module.exports = sequelize;
