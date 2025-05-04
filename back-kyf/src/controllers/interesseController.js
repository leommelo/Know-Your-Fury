const db = require('../config/db');
const Interesse = require('../models/Interesse');
const User = require('../models/User');

exports.createInteresse = async (req, res) => {
  let { jogos, eventos, compras } = req.body;
  const cpf_usuario = req.user.cpf; 

  try {
    const user = await User.findByCpf(cpf_usuario);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (Array.isArray(jogos)) jogos = jogos.join(', ');
    if (Array.isArray(eventos)) eventos = eventos.join(', ');
    if (Array.isArray(compras)) compras = compras.join(', ');

    await Interesse.createOrUpdate(cpf_usuario, jogos, eventos, compras);

    res.status(201).json({ message: 'Pedido criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInteresse = async (req, res) => {
  const cpf_usuario = req.user.cpf;

  try {
    // Faz um JOIN para buscar os dados do usuário e seus interesses
    const result = await Interesse.findUserWithInterests(cpf_usuario);

    if (!result) {
      return res.status(404).json({ error: 'Usuário ou interesses não encontrados' });
    }

    res.status(200).json(result); // Retorna os dados do usuário e interesses
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};