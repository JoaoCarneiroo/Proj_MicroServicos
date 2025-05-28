const axios = require('axios');
const { taskServiceUrl } = require('../config');

exports.criarTarefa = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await axios.post(`${taskServiceUrl}/tasks`, req.body, {
      headers: {
        'X-User-Id': userId
      },
      withCredentials: true
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao criar tarefa: ' + (err.response?.data?.error || err.message) });
  }
};

exports.mostrarTarefaUtilizador = async (req, res) => {
  try {
    const { userId } = req.user;

    const response = await axios.get(`${taskServiceUrl}/tasks`, {
      headers: {
        'X-User-Id': userId
      },
      withCredentials: true
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao listar tarefas: ' + (err.response?.data?.error || err.message) });
  }
};

exports.atualizarTarefa = async (req, res) => {
  try {
    const { userId } = req.user;

    const { id } = req.params;
    const response = await axios.patch(`${taskServiceUrl}/tasks/${id}`, req.body, {
      headers: {
        'X-User-Id': userId
      },
      withCredentials: true
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao atualizar tarefa: ' + (err.response?.data?.error || err.message) });
  }
};

exports.apagarTarefa = async (req, res) => {
  try {
    const { userId } = req.user;

    const { id } = req.params;
    const response = await axios.delete(`${taskServiceUrl}/tasks/${id}`, {
      headers: {
        'X-User-Id': userId
      },
      withCredentials: true
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao apagar a tarefa: ' + (err.response?.data?.error || err.message) });
  }
};
