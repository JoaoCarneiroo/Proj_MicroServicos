const Utilizador = require('../models/Utilizador'); // Ajusta o caminho conforme necessário
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'carneiro_secret';

// Verifica credenciais para o serviço Auth
exports.verificarCredenciais = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilizador = await Utilizador.findOne({ where: { email } }); // Alterado de findOne do Mongoose
    if (!utilizador) {
      return res.status(404).json({ valido: false });
    }

    const match = await bcrypt.compare(password, utilizador.password);
    if (!match) {
      return res.status(401).json({ valido: false });
    }

    // Retorna os dados mínimos do utilizador
    return res.status(200).json({
      valido: true,
      id: utilizador.id, // Alterado de _id para id do Sequelize
      nome: utilizador.nome,
      email: utilizador.email
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('Authorization', {
    httpOnly: false,
    secure: false,
    sameSite: 'Lax'
  });
  res.status(200).json({ message: 'Desconectado com sucesso!' });
};

// Obter todos os utilizadores
exports.mostrarUtilizadores = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll({
      attributes: ['nome', 'email'] // Selecionando apenas os campos necessários
    });
    res.json(utilizadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter utilizador por ID
exports.mostrarUtilizadorID = async (req, res) => {
  try {
    const utilizador = await Utilizador.findByPk(req.params.id, {
      attributes: ['nome', 'email']
    });
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }
    res.json(utilizador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter utilizador autenticado
exports.mostrarUtilizadorAutenticado = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Utilizador não autenticado' });
    }

    const utilizador = await Utilizador.findByPk(req.user.id, {
      attributes: ['nome', 'email']
    });
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    res.json(utilizador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar novo utilizador
exports.criarUtilizador = async (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const novoUtilizador = await Utilizador.create({
      nome,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Utilizador criado com Sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar utilizador
exports.atualizarUtilizador = async (req, res) => {
  const { nome, email, password } = req.body;

  try {
    const utilizador = await Utilizador.findByPk(req.user.id);
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    if (nome) utilizador.nome = nome;
    if (email) utilizador.email = email;
    if (password) utilizador.password = await bcrypt.hash(password, 10);

    await utilizador.save();
    res.json({ message: 'Utilizador atualizado com sucesso!' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apagar utilizador
exports.apagarUtilizador = async (req, res) => {
  try {
    const utilizador = await Utilizador.findByPk(req.user.id);
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    await utilizador.destroy(); // Remove o utilizador da base de dados

    res.clearCookie('Authorization', {
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    });

    res.json({ message: 'Utilizador removido com sucesso!' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
