const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Configuração do Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// -------------------------------------
// SEÇÃO 1: Autenticação
// -------------------------------------

/* app.use('/autenticar', require('./routes/authRoutes')); */

// -------------------------------------
// SEÇÃO 2: Gestão de Utilizadores
// -------------------------------------

app.use('/autenticar', require('./routes/userRoutes'));

// -------------------------------------
// SEÇÃO 3: Gestão de Tarefas
// -------------------------------------

app.use('/tarefas', require('./routes/taskRoutes'));

// -------------------------------------
// SERVIDOR
// -------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Maestro ligado na Porta ${PORT}`);
});
