const jwt = require('jsonwebtoken');
const Task = require('../models/tasksModel');
const secretKey = 'carneiro_secret';

// Extrair utilizador do token JWT no cookie
function getUserFromToken(req) {
    const token = req.cookies.Authorization;
    if (!token) throw new Error('Token não fornecido');

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Token decodificado:", decoded); // ← VERIFICA ISTO
        return decoded;    } catch (err) {
        throw new Error('Token inválido ou expirado');
    }
}

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
    try {
        const user = getUserFromToken(req);
        const { task, startTime, endTime } = req.body;

        const newTask = await Task.create({
            userId: user.userId, // Correto
            task,
            startTime,
            endTime
        });

        return res.status(201).json({ message: 'Tarefa criada com sucesso', task: newTask });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Obter todas as tarefas do utilizador autenticado
exports.getTasks = async (req, res) => {
    try {
        const user = getUserFromToken(req);

        const tasks = await Task.findAll({
            where: { userId: user.userId }, // Correto
            order: [['startTime', 'ASC']]
        });

        return res.status(200).json({ tasks });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
    try {
        const user = getUserFromToken(req);
        const { id } = req.params;
        const { task, startTime, endTime } = req.body;

        const taskToUpdate = await Task.findOne({ where: { id, userId: user.userId } }); // Correto

        if (!taskToUpdate) {
            return res.status(404).json({ error: 'Tarefa não encontrada ou não autorizada' });
        }

        await taskToUpdate.update({ task, startTime, endTime });

        return res.status(200).json({ message: 'Tarefa atualizada com sucesso', task: taskToUpdate });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
    try {
        const user = getUserFromToken(req);
        const { id } = req.params;

        const taskToDelete = await Task.findOne({ where: { id, userId: user.userId } }); // Corrigido aqui

        if (!taskToDelete) {
            return res.status(404).json({ error: 'Tarefa não encontrada ou não autorizada' });
        }

        await taskToDelete.destroy();

        return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
