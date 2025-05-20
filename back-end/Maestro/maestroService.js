const express = require('express');
const axios = require('axios');
const app = express();

// Configuração do Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração das URLs base de cada serviço
const userServiceUrl = 'http://user-service:5000';
const authServiceUrl = 'http://auth-service:4000';

// -------------------------------------
// SEÇÃO 1: Autenticação
// -------------------------------------
app.post('/autenticar/verificar', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fazendo a requisição para o Auth Service para verificar as credenciais
    const response = await axios.post(`${authServiceUrl}/auth/login`, { email, password }, {
      withCredentials: true
    });

    // Se a autenticação for bem-sucedida, retorna a resposta do Auth Service
    return res.status(200).json({ message: response.data.message });
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao autenticar: ' + (err.response?.data?.error || err.message) });
  }
});

// Logout
app.post('/autenticar/logout', async (req, res) => {
  try {
    // Fazendo a requisição para o Auth Service para realizar o logout
    const response = await axios.post(`${authServiceUrl}/auth/logout`);
    res.status(200).json(response.data);
  } catch (err) {
    return res.status(err.response?.status || 500).json({ error: (err.response?.data?.error || err.message) });
  }
});

// -------------------------------------
// SEÇÃO 2: Gestão de Utilizadores
// -------------------------------------
app.post('/autenticar/criar', async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    const response = await axios.post(`${userServiceUrl}/autenticar/criar`, { nome, email, password });
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
    res.status(500).json({ error: 'Erro ao criar utilizador: ' + err.message });
  }
});

app.get('/autenticar', async (req, res) => {
  try {
    const response = await axios.post(`${userServiceUrl}/autenticar`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar utilizadores: ' + err.message });
  }
});

app.get('/autenticar/utilizador/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${userServiceUrl}/autenticar/utilizador/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter utilizador: ' + err.message });
  }
});

app.get('/autenticar/utilizador', async (req, res) => {
  try {
    const response = await axios.get(`${userServiceUrl}/autenticar/utilizador`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter utilizador autenticado: ' + err.message });
  }
});

app.patch('/autenticar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, password } = req.body;
    const response = await axios.put(`${userServiceUrl}/autenticar/${id}`, { nome, email, password });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar utilizador: ' + err.message });
  }
});

app.delete('/autenticar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${userServiceUrl}/autenticar/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apagar utilizador: ' + err.message });
  }
});

// -------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor maestro ligado na porta ${PORT}`);
});
