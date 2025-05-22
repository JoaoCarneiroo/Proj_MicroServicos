const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

// Transporter do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint para enviar email de confirmação
app.post('/notificar/email-confirmacao', async (req, res) => {
  const { email, nome } = req.body;

  const mailOptions = {
    from: '"MicroServiços" <joaomiko25@gmail.com>',
    to: email,
    subject: 'Confirmação de Registo',
    html: `
      <h3>Olá ${nome},</h3>
      <p>Obrigado por te registares! Confirma o teu email clicando no link abaixo:</p>
      <a href="http://localhost:5000/user/confirmar?email=${email}">Confirmar Email</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email de confirmação' });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Serviço de Notificações ligado na porta ${PORT}`);
});
