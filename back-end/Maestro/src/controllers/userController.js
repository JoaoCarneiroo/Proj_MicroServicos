const axios = require('axios');
const { userServiceUrl, notifServiceUrl } = require('../config');

exports.mostrarUtilizadores = async (req, res) => {
  try {
    const response = await axios.post(`${userServiceUrl}/user`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar utilizadores: ' + err.message });
  }
};

exports.criarUtilizador = async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    const response = await axios.post(`${userServiceUrl}/user/criar`, { nome, email, password });

    try {
      await axios.post(`${notifServiceUrl}/notificar/email-confirmacao`, { nome, email });
    } catch (notifErr) {
      console.error('Falha ao enviar email de confirmação:', notifErr.message);
    }

    res.status(201).json(response.data);
  } catch (err) {
    console.log('Erro recebido do user-service:', err.response?.data);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.error || err.message
    });
  }
};

exports.mostrarUtilizadorID = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${userServiceUrl}/user/utilizador/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter utilizador: ' + (err.response?.data?.error || err.message) });
  }
};

exports.mostrarUtilizadorAutenticado = async (req, res) => {
  try {
    const { userId } = req.user;

    const response = await axios.get(`${userServiceUrl}/user/utilizador`, {
      headers: {
        'X-User-Id': userId
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter utilizador autenticado: ' + (err.response?.data?.error || err.message) });
  }
};

exports.atualizarUtilizador = async (req, res) => {
  try {
    const { userId } = req.user;

    const { nome, password } = req.body;
    const response = await axios.patch(`${userServiceUrl}/user`, { nome, password }, {
      headers: {
        'X-User-Id': userId
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar utilizador: ' + (err.response?.data?.error || err.message) });
  }
};

exports.apagarUtilizador = async (req, res) => {
  try {
    const { userId } = req.user;

    const response = await axios.delete(`${userServiceUrl}/user`, {
      headers: {
        'X-User-Id': userId
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apagar utilizador: ' + (err.response?.data?.error || err.message) });
  }
};
