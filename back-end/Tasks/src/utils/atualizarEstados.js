const Task = require('../models/tasksModel');
const { Op } = require('sequelize');
const cron = require('node-cron');
const { DateTime } = require('luxon');
const axios = require('axios');

// Enviar email via notifService
async function enviarEmailTarefaAtiva(email, task) {
  try {
    await axios.post('http://notif-service:6000/notificar/tarefa-ativa', {
      email,
      task
    });
  } catch (error) {
    console.error('Erro ao enviar email da tarefa ativa:', error.message || error);
  }
}

// Obter dados do utilizador via serviço de autenticação
async function obterUtilizadorPorId(userId) {
  try {
    const response = await axios.get(`http://user-service:5000/user/utilizador/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter utilizador ${userId}:`, error.message);
    return null;
  }
}

async function atualizarEstadosTarefas() {
  const agoraLisboa = DateTime.now().setZone('Europe/Lisbon');
  const agora = agoraLisboa.toJSDate();

  await Task.update(
    { estado: 'Não Iniciado' },
    { where: { startTime: { [Op.gt]: agora } } }
  );

  const tarefasParaEntrarEmProgresso = await Task.findAll({
    where: {
      startTime: { [Op.lte]: agora },
      endTime: { [Op.gt]: agora },
      estado: { [Op.not]: 'Em Progresso' }
    }
  });

  await Task.update(
    { estado: 'Em Progresso' },
    {
      where: {
        startTime: { [Op.lte]: agora },
        endTime: { [Op.gt]: agora }
      }
    }
  );

  for (const tarefa of tarefasParaEntrarEmProgresso) {
    const utilizador = await obterUtilizadorPorId(tarefa.userId);
    if (utilizador && utilizador.email) {
      await enviarEmailTarefaAtiva(utilizador.email, tarefa.task);
    }
  }

  await Task.update(
    { estado: 'Finalizado' },
    { where: { endTime: { [Op.lte]: agora } } }
  );
}

// Executar a cada 5 minutos
cron.schedule('*/5 * * * *', () => {
  atualizarEstadosTarefas();
});

// 10 em 10 segundos para testes
// cron.schedule('*/10 * * * * *', () => {
//   atualizarEstadosTarefas();
// });

module.exports = atualizarEstadosTarefas;
