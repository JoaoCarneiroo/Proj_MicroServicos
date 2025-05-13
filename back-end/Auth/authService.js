const express = require('express');
const cookieParser = require('cookie-parser'); 


// Todas as Rotas   
const authRoutes = require('./routes/authRoutes');


const app = express();

// Configuração do CORS - Se necessário
const corsOptions = {
  origin: '*', // Ou você pode especificar o domínio que precisa acessar o Auth Service
  credentials: true,  // Permite o envio de cookies
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// Definir as Rotas
app.use('/auth', authRoutes);


const PORT = 4000;

app.listen(PORT, () => 
    console.log(`Servidor ligado na porta ${PORT}`      
));
