const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const Task = require('./models/tasksModel');

sequelize.sync({ alter: true }) // ou { force: true } para recriar
  .then(() => console.log('Tabelas sincronizadas com sucesso.'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));



// Import task routes
const taskRoutes = require('./routes/tasksRoutes.js');

const app = express();

// CORS configuration (adjust origin in production)
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use('/', taskRoutes);  // This allows /tasks and /tasks/:id

// Start server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Serviço de Tarefas ligado na Porta ${PORT}`);
});
