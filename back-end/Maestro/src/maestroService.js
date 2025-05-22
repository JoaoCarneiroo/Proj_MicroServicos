const express = require('express');
const axios = require('axios');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Configuração do Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3001', // URL do teu frontend
  credentials: true
}));

// Configuração das URLs base de cada serviço
const authServiceUrl = 'http://auth-service:4000';
const userServiceUrl = 'http://user-service:5000';
const notifServiceUrl = 'http://notif-service:6000';

// -------------------------------------
// SEÇÃO 1: Autenticação
// -------------------------------------

// Endpoint para Login
app.post('/autenticar/verificar', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fazendo a requisição para o Auth Service para verificar as credenciais
    const response = await axios.post(`${authServiceUrl}/auth/login`, { email, password }, {
      withCredentials: true
    });

    // Repassar todos os cookies corretamente
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      cookies.forEach(cookie => res.append('Set-Cookie', cookie));
    }

    // Se a autenticação for bem-sucedida, retorna a resposta do Auth Service
    return res.status(200).json({ message: response.data.message });
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao autenticar: ' + (err.response?.data?.error || err.message) });
  }
});

// Endpoint para Logout
app.post('/autenticar/logout', async (req, res) => {
  try {
    // Remover a Coookie Authorization
    res.clearCookie('Authorization', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',

    });

    return res.status(200).json({ message: 'Logout realizado com sucesso' });

  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: err.response?.data?.error || err.message,
    });
  }
});


// -------------------------------------
// SEÇÃO 2: Gestão de Utilizadores
// -------------------------------------

// Endpoint para Mostrar Todos os Utilizadores
app.get('/autenticar', async (req, res) => {
  try {
    const response = await axios.post(`${userServiceUrl}/user`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar utilizadores: ' + err.message });
  }
});

// Endpoint para Criar um Novo Utilizador
app.post('/autenticar/criar', async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    // Criar Utilizador no user-service
    const response = await axios.post(`${userServiceUrl}/user/criar`, { nome, email, password });

    // Enviar notificação por Email no notif-service
    try {
      await axios.post(`${notifServiceUrl}/notificar/email-confirmacao`, { nome, email });
    } catch (notifErr) {
      console.error('Falha ao enviar email de confirmação:', notifErr.message);
    }

    res.status(201).json(response.data);
  } catch (err) {
    if (err.response) {
      // Log de depuração
      console.log('Erro recebido do user-service:', err.response.data);

      // Repassar o status e os dados de erro vindos do user-service
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    // Erro interno (sem resposta do user-service)
    console.log('Erro não tratado', err.message);
    res.status(500).json({ error: 'Erro ao criar utilizador: ' + (err.response?.data?.error || err.message) });
  }
});


// Endpoint para Mostrar um Utilizador Específico pelo ID
app.get('/autenticar/utilizador/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${userServiceUrl}/user/utilizador/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter utilizador: ' + (err.response?.data?.error || err.message) });
  }
});

// Endpoint para Mostrar o Utilizador Autenticado
app.get('/autenticar/utilizador', async (req, res) => {
  try {
    const authCookie = req.cookies['Authorization'];

    const response = await axios.get(`${userServiceUrl}/user/utilizador`, {
      headers: {
        Cookie: `Authorization=${authCookie}`
      },
      withCredentials: true
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter utilizador autenticado: ' + (err.response?.data?.error || err.message) });
  }
});

// Endpoint para Atualizar um Utilizador
app.patch('/autenticar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, password } = req.body;
    const response = await axios.put(`${userServiceUrl}/user/${id}`, { nome, email, password }, {
      withCredentials: true
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar utilizador: ' + err.message });
  }
});

// Endpoint para Apagar um Utilizador
app.delete('/autenticar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${userServiceUrl}/user/${id}`, {
      withCredentials: true
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apagar utilizador: ' + err.message });
  }
});

// -------------------------------------
// SERVIDOR
// -------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Maestro ligado na Porta ${PORT}`);
});
