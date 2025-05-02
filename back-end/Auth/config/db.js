const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://joaomiko25:joaogoodman@cluster0.x0o4rxg.mongodb.net/MicroServicos';

const DB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com Sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  }
};

module.exports = DB;
