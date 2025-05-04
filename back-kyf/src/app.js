const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const socialAnalysis = require('./routes/socialAnalysis');
const cors = require('cors');
const path = require('path');

const allowedOrigins = [
  'https://know-your-fury.vercel.app',
  'http://localhost:3000'
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
app.options('*', (req, res) => {
  res.sendStatus(204);
});

const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/usuarios', userRoutes);
app.use('/interesses', interesseRoutes);
app.use('/social', socialAnalysis);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});