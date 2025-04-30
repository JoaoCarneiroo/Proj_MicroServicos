const express = require('express');
const DB = require('./config/db');


// Todas as Rotas   
const utilizadorRoutes = require('./routes/utilizadorRoutes');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexão à Base de Dados MongoDB
DB();


// Definir as Rotas
app.use('/autenticar', utilizadorRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
    console.log(`Servidor ligado na porta ${PORT}`      
));
