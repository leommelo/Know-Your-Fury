const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const socialAnalysis = require('./routes/socialAnalysis');
const cors = require('cors');
const path = require('path');

// CORS configuração
const allowedOrigins = [
  'https://know-your-fury.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Aplicar CORS antes de qualquer outra rota
app.use(cors(corsOptions));

// Outras configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Rotas da API
app.use('/usuarios', userRoutes);
app.use('/interesses', interesseRoutes);
app.use('/social', socialAnalysis);

// Para debugging - verificar se os cabeçalhos CORS estão sendo aplicados
app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  console.log('CORS headers:', res.getHeaders());
  next();
});

// Use a porta fornecida pelo Railway ou 3000 como fallback
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});