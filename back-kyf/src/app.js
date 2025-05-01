const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const interesseRoutes = require('./routes/interesseRoutes');

app.use(express.json());

// Rotas
app.use('/usuarios', userRoutes);
app.use('/interesses', interesseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
