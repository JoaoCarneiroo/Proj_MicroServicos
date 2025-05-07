const jwt = require('jsonwebtoken');
const axios = require('axios');
const secretKey = 'carneiro_secret';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Chama o microserviço "user" para verificar se existe esse utilizador
        const response = await axios.post('http://user-service:3000/verificar', { email, password });

        if (!response.data) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.cookie('Authorization', token, { httpOnly: true });
        return res.status(200).json({ message: 'Autenticado com sucesso' });

    } catch (err) {
        return res.status(500).json({ error: 'Erro ao autenticar', details: err.message });
    }
};
