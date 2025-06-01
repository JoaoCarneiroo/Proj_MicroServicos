const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/tasksRoutes.js');

// Middleware para processar JSON e urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));


// Definir as Rotas do Serviço de Tarefas
app.use('/', taskRoutes);


const PORT = 7000;

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Base de Dados Postgre SQL conectada com Sucesso');
  })
  .catch(err => console.error('Erro ao conectar à base de dados:', err));


// Iniciar o Serviço de Tarefas
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serviço de Tarefas ligado na Porta ${PORT}`);
});
