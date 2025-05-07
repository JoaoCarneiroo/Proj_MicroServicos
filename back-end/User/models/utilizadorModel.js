const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema do Utilizador
const UtilizadorSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
    trim: true,
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres.'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'O email deve ser válido.'],
  },
  password: {
    type: String,
    required: [true, 'A palavra-passe é obrigatória.'],
    minlength: [6, 'A palavra-passe deve ter no mínimo 6 caracteres.'],
  },
}, { timestamps: true });


// Mensagem de erro personalizada para violação de campo único (email)
UtilizadorSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Já existe um utilizador com esse email.'));
  } else {
    next(error);
  }
});

const Utilizador = mongoose.model('Utilizador', UtilizadorSchema);

module.exports = Utilizador;