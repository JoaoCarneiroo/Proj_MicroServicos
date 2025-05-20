const jwt = require('jsonwebtoken');
const secretKey = 'carneiro_secret';

const checkAuth = (req, res, next) => {
    const token = req.cookies?.Authorization;
    console.log(req);

    if (!token) {
        return res.status(401).json({ error: 'Não existe nenhum token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token Inválido ou Expirado' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = checkAuth;
