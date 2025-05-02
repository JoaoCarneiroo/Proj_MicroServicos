const Utilizador = require('../models/utilizadorModel');

// Função para criar um novo utilizador
exports.criarUtilizador = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cria um novo utilizador
    const novoUser = new Utilizador({
      username,
      email,
      password, // Podes adicionar encriptação de password aqui com bcrypt, por exemplo
    });

    // Salva o utilizador na base de dados
    await novoUser.save();

    res.status(201).json({ message: 'Novo utilizador criado com sucesso!', user: novoUser });
  } catch (error) {
    console.error('Erro ao criar utilizador:', error);
    res.status(500).json({ message: 'Erro ao criar utilizador', error: error.message });
  }
};

// Função para obter todos os utilizadores
exports.mostrarUtilizadores = async (req, res) => {
  try {
    const utilizadores = await Utilizador.find();
    res.status(200).json(utilizadores);
  } catch (error) {
    console.error('Erro ao obter utilizadores:', error);
    res.status(500).json({ message: 'Erro ao obter utilizadores', error: error.message });
  }
};
