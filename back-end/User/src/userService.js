const express = require('express');
const sequelize = require('./config/db');
const utilizadorRoutes = require('./routes/utilizadorRoutes');

const app = express();

// Middleware para processar JSON e urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definir as Rotas
app.use('/autenticar', utilizadorRoutes);

const PORT = 5000;

// Conectar ao banco de dados e sincronizar os modelos
sequelize.sync().then(() => {
  console.log('Base de Dados PostgreSQL conectada com sucesso');
}).catch((err) => {
  console.error('Erro na sincronização do banco de dados', err);
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor ligado na porta ${PORT}`);
});
