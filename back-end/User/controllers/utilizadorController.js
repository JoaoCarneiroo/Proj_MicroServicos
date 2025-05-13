const Utilizador = require('../models/utilizadorModel');
const bcrypt = require('bcryptjs');

// ---------------------------
// SEÇÃO 1: Autenticação
// ---------------------------
exports.verificarCredenciais = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilizador = await Utilizador.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(404).json({ valido: false });
    }

    const match = await bcrypt.compare(password, utilizador.password);
    if (!match) {
      return res.status(401).json({ valido: false });
    }

    return res.status(200).json({
      valido: true,
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('Authorization', {
    httpOnly: false,
    secure: false,
    sameSite: 'Lax'
  });
  res.status(200).json({ message: 'Desconectado com sucesso!' });
};

// ---------------------------
// SEÇÃO 2: Gestão de Utilizadores
// ---------------------------
exports.mostrarUtilizadores = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll({
      attributes: ['nome', 'email']
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
    try {
        // Logic to fetch the authenticated user
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

exports.apagarUtilizador = async (req, res) => {
  try {
    const utilizador = await Utilizador.findByPk(req.user.id);
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
