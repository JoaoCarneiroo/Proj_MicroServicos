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

app.post('/notificar/tarefa-ativa', async (req, res) => {
  const { email, task } = req.body;

  if (!email || !task) {
    return res.status(400).json({ error: 'Faltam parâmetros obrigatórios: email e nomeTarefa' });
  }

  const mailOptions = {
    from: '"MicroServiços" <joaomiko25@gmail.com>',
    to: email,
    subject: `Tarefa "${task}" está ativa`,
    html: `
      <h3>Aviso</h3>
      <p>A tarefa <strong>${task}</strong> acabou de entrar em progresso.</p>
      <p>Por favor, verifica o sistema para mais detalhes.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `Email enviado para tarefa "${task}"` });
  } catch (error) {
    console.error('Erro ao enviar email de tarefa ativa:', error);
    res.status(500).json({ error: 'Erro ao enviar email de tarefa ativa' });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serviço de Notificações ligado na Porta ${PORT}`);
});
