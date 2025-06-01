const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app = express();

// Configuração do CORS
app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
   credentials: true,  
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// Definir as Rotas do Serviço de Autenticação
app.use('/auth', authRoutes);


const PORT = 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serviço de Utilizador ligado na Porta ${PORT}`);
});
