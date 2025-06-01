const express = require('express');
const sequelize = require('./config/db');
const utilizadorRoutes = require('./routes/utilizadorRoutes');
const cookieParser = require('cookie-parser'); 

const app = express();

// Middleware para processar JSON e urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Definir as Rotas do Serviço de Utilizador
app.use('/user', utilizadorRoutes);

const PORT = 5000;

// Conectar ao banco de dados e sincronizar os modelos
sequelize.sync().then(() => {
  console.log('Base de Dados PostgreSQL conectada com sucesso');
}).catch((err) => {
  console.error('Erro na sincronização do banco de dados', err);
});


sequelize.sync({ force: false }) // or just sequelize.sync()
  .then(() => {
    console.log('Base de Dados PostgreSQL conectada com sucesso');
    // Start the server *inside* the .then() to ensure DB is ready
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Serviço de Utilizador ligado na Porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro na sincronização do banco de dados', err);
  });


// Iniciar o Serviço de Utilizador
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serviço de Utilizador ligado na Porta ${PORT}`);
});
