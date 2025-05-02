const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema do Utilizador
const UtilizadorSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Utilizador = mongoose.model('Utilizador', UtilizadorSchema);

module.exports = Utilizador;
