const axios = require('axios');
const { authServiceUrl } = require('../config');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${authServiceUrl}/auth/login`, { email, password }, {
      withCredentials: true
    });

    const cookies = response.headers['set-cookie'];
    if (cookies) cookies.forEach(cookie => res.append('Set-Cookie', cookie));

    res.status(200).json({ message: response.data.message });
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: 'Erro ao autenticar: ' + (err.response?.data?.error || err.message)
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('Authorization', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
