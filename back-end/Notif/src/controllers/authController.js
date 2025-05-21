const jwt = require('jsonwebtoken');
const secretKey = 'carneiro_secret';
const axios = require('axios');

const userServiceUrl = 'http://user-service:5000';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const response = await axios.post(`${userServiceUrl}/user/verificar`, { email, password });

        const utilizador = response.data;

        const token = jwt.sign({ id: utilizador.id, email: utilizador.email }, secretKey, { expiresIn: '1h' });

        // Salvar o token no cookie
        res.cookie('Authorization', token, { httpOnly: true, secure: false, sameSite: 'Lax' });

        return res.status(200).json({ message: 'Autenticado com sucesso' });
    } catch (err) {
        return res.status(err.response?.status || 500).json({ error: (err.response?.data?.error || err.message) });
    }
};

exports.logout = async (req, res) => {
    try {
        // Remover o cookie de autorização ao fazer o logout
        res.clearCookie('Authorization');
        return res.status(200).json({ message: 'Logout bem-sucedido' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao fazer Logout' + (err.response?.data?.error || err.message) });
    }
};
