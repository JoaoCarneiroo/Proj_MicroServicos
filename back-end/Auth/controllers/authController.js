const jwt = require('jsonwebtoken');
const secretKey = 'carneiro_secret';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validação local das credenciais (já realizada pelo Maestro Service)
        // Não é necessário fazer uma requisição externa ao User Service, 
        // pois isso agora é feito no Maestro Service

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        // Salvar o token no cookie com a flag httpOnly para proteger contra XSS
        res.cookie('Authorization', token, { httpOnly: true });

        return res.status(200).json({ message: 'Autenticado com sucesso' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao autenticar', details: err.message });
    }
};

exports.logout = async (req, res) => {
    try {
        // Remover o cookie de autorização ao fazer o logout
        res.clearCookie('Authorization');
        return res.status(200).json({ message: 'Logout bem-sucedido' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao desconectar', details: err.message });
    }
};
