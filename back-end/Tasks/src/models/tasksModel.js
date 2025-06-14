const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilizadores',
      key: 'userId'
    },
    onDelete: 'CASCADE'
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 255],
        msg: 'A tarefa deve ter pelo menos 2 caracteres.'
      }
    }
  },
  estado: {
    type: DataTypes.ENUM('Não Iniciado', 'Em Progresso', 'Finalizado'),
    allowNull: false,
    defaultValue: 'Não Iniciado'
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfterToday(value) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (new Date(value) < today) {
          throw new Error('A data de início deve ser hoje ou uma data futura.');
        }
      }
    }
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfterStart(value) {
        if (this.startTime && value <= this.startTime) {
          throw new Error('A data de término deve ser após a data de início.');
        }

      }
    }
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

module.exports = Task;
