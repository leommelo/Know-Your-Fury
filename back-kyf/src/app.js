const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const socialAnalysis = require('./routes/socialAnalysis');
const path = require('path');

// ======== TODAS AS ORIGENS PERMITIDAS ========
// Esta abordagem é mais permissiva, mas pode resolver problemas no Railway
app.use((req, res, next) => {
  // Permitir qualquer origem
  res.header('Access-Control-Allow-Origin', '*');
  
  // Métodos permitidos
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Cabeçalhos permitidos
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle pre-flight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Middlewares padrão
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas estáticas
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Rotas da API
app.use('/usuarios', userRoutes);
app.use('/interesses', interesseRoutes);
app.use('/social', socialAnalysis);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('CORS configurado para permitir qualquer origem');
});