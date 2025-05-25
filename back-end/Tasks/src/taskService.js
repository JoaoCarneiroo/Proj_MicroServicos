const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/tasksRoutes.js');

const app = express();

// CORS configuration (adjust origin in production)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

// Middleware para processar JSON e urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use('/', taskRoutes); 


const PORT = 7000;

sequelize.sync({ alter: true }) // ou { force: true } para recriar
  .then(() => console.log('Tabelas sincronizadas com sucesso.'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

// Iniciar o Serviço de Tarefas
app.listen(PORT, () => {
  console.log(`Serviço de Tarefas ligado na Porta ${PORT}`);
});
