const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'postgres-service',   // Use K8s service name for Postgres
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'microservicos',
  username: process.env.DB_USER || 'joaomiko',
  password: process.env.DB_PASS || 'joaogoodman',
});

module.exports = sequelize;
