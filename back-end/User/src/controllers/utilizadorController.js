const Utilizador = require('../models/utilizadorModel');
const bcrypt = require('bcryptjs');
const { ValidationError } = require('sequelize');

// ---------------------------
// SECÇÃO 1: Autenticação
// ---------------------------
exports.verificarCredenciais = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilizador = await Utilizador.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    if (!utilizador.emailConfirmado) {
      return res.status(403).json({ error: 'Por favor confirma o teu email antes de iniciar sessão.' });
    }

    const match = await bcrypt.compare(password, utilizador.password);
    if (!match) {
      return res.status(401).json({ error: 'Email ou Password incorretas' });
    }

    return res.status(200).json({
      userId: utilizador.userId,
      nome: utilizador.nome,
      email: utilizador.email
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ---------------------------
// SECÇÃO 2: Gestão de Utilizadores
// ---------------------------
exports.mostrarUtilizadores = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll({
      attributes: ['userId', 'nome', 'email']
    });
    res.json(utilizadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.mostrarUtilizadorAutenticado = async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
  }

  try {
    const utilizador = await Utilizador.findByPk(userId, {
      attributes: ['userId', 'nome', 'email']
    });

    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }
    res.json(utilizador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
      password: hashedPassword,
      emailConfirmado: false
    });

    res.status(201).json({
      message: 'Utilizador criado com sucesso!',
      userId: novoUtilizador.userId,
      nome: novoUtilizador.nome,
      email: novoUtilizador.email
    });

  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Erro interno: ' + err.message });
  }
};
exports.confirmarEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const utilizador = await Utilizador.findOne({ where: { email } });

    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    if (utilizador.emailConfirmado) {
      return res.status(400).json({ message: 'Email já confirmado.' });
    }

    utilizador.emailConfirmado = true;
    await utilizador.save();

    res.status(200).send(`
      <h2>Email confirmado com sucesso!</h2>
      <p>Podes agora iniciar sessão na plataforma.</p>
    `);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao confirmar email: ' + err.message });
  }
};

exports.atualizarUtilizador = async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
  }

  const { nome, password } = req.body;

  try {
    const utilizador = await Utilizador.findByPk(userId);
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    if (nome) utilizador.nome = nome;
    if (password) utilizador.password = await bcrypt.hash(password, 10);

    await utilizador.save();
    res.json({ message: 'Utilizador atualizado com sucesso!' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apagarUtilizador = async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Cabeçalho X-User-Id em falta' });
  }

  try {
    const utilizador = await Utilizador.findByPk(userId);
    if (!utilizador) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    await utilizador.destroy();

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
