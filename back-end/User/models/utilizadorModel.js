const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Utilizador = sequelize.define('Utilizador', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome é obrigatório.' },
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
      notEmpty: { msg: 'O email é obrigatório.' },
      isEmail: { msg: 'O email deve ser válido.' },
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'A palavra-passe é obrigatória.' },
      len: {
        args: [6, 255],
        msg: 'A palavra-passe deve ter no mínimo 6 caracteres.'
      }
    }
  }
}, {
  timestamps: true
});

module.exports = Utilizador;
