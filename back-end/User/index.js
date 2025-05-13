const express = require('express');
const sequelize = require('./config/db');


// Todas as Rotas   
const utilizadorRoutes = require('./routes/utilizadorRoutes');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Definir as Rotas
app.use('/autenticar', utilizadorRoutes);


const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Base de dados SQLite sincronizada.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar a base de dados:', err);
  });

app.listen(PORT, () => 
    console.log(`Servidor ligado na porta ${PORT}`      
));
