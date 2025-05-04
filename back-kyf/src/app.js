const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const socialAnalysis = require('./routes/socialAnalysis');
const fotoBase64Routes = require('./routes/fotoBase64Route');
const cors = require('cors');
const path = require('path');

const allowedOrigins = [
  'https://know-your-fury.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // ou um domínio específico
  next();
}, express.static(uploadsPath));
app.use('/imagens', fotoBase64Routes);


app.use('/usuarios', userRoutes);
app.use('/interesses', interesseRoutes);
app.use('/social', socialAnalysis);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});