const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Utilizador = sequelize.define('Utilizador', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 255],
        msg: 'O nome deve ter pelo menos 2 caracteres.'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Já existe um utilizador com esse email.'
    },
    validate: {
      isEmail: { msg: 'O email deve ser válido.' },
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailConfirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Utilizadores',
  timestamps: false
});

module.exports = Utilizador;
