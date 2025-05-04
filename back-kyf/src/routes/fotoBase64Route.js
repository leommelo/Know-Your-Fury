const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/foto-base64/:nome', (req, res) => {
  const nomeArquivo = req.params.nome;
  const caminho = path.join(__dirname, '..', '..', 'uploads', nomeArquivo);

  fs.readFile(caminho, (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    const base64 = Buffer.from(data).toString('base64');
    const mimeType = 'image/png'; // ou image/jpeg conforme necessário
    res.json({ base64: `data:${mimeType};base64,${base64}` });
  });
});

module.exports = router;
