const express = require('express');


// Todas as Rotas   
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// Definir as Rotas
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
    console.log(`Servidor ligado na porta ${PORT}`      
));
