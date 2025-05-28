const Task = require('../models/tasksModel');
const atualizarEstadosTarefas = require('../utils/atualizarEstados');

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
    }

    const { task, startTime, endTime } = req.body;

    try {

        const newTask = await Task.create({
            userId: userId,
            task,
            startTime,
            endTime
        });

        await atualizarEstadosTarefas();

        return res.status(201).json({ message: 'Tarefa criada com sucesso', task: newTask });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Obter todas as tarefas do utilizador autenticado
exports.getTasks = async (req, res) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
    }

    try {
        const tasks = await Task.findAll({
            where: { userId: userId },
            order: [['startTime', 'ASC']]
        });

        return res.status(200).json({ tasks });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Atualizar uma tarefa do utilizador autenticado
exports.updateTask = async (req, res) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
    }
    try {
        const { id } = req.params;
        const { task, startTime, endTime } = req.body;

        const taskToUpdate = await Task.findOne({ where: { id, userId: userId } });

        if (!taskToUpdate) {
            return res.status(404).json({ error: 'Tarefa não encontrada ou não autorizada' });
        }

        await atualizarEstadosTarefas();

        await taskToUpdate.update({ task, startTime, endTime });

        return res.status(200).json({ message: 'Tarefa atualizada com sucesso', task: taskToUpdate });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Apagar uma tarefa do utilizador autenticado
exports.deleteTask = async (req, res) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
    }
    try {
        const { id } = req.params;

        const taskToDelete = await Task.findOne({ where: { id, userId: userId } });

        if (!taskToDelete) {
            return res.status(404).json({ error: 'Tarefa não encontrada ou não autorizada' });
        }

        await taskToDelete.destroy();

        return res.status(200).json({ message: 'Tarefa apagada com sucesso' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
