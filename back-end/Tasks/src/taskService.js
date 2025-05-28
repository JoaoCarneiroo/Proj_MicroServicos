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

sequelize.sync({ alter: true }) // ou { force: true } para recriar
  .then(() => console.log('Tabela de Tarefas sincronizadas com sucesso.'))
  .catch(err => console.error('Erro ao sincronizar tabela de tarefas:', err));

// Iniciar o Serviço de Tarefas
app.listen(PORT, () => {
  console.log(`Serviço de Tarefas ligado na Porta ${PORT}`);
});
