const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const socialAnalysis = require('./routes/socialAnalysis');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/usuarios', userRoutes);
app.use('/interesses', interesseRoutes);
app.use('/social', socialAnalysis);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});