const { analisarTextoComHuggingFace } = require('../services/huggingFaceService');
const { createOrUpdate } = require('../models/Interesse');
const { atualizarScoreUsuario } = require('../services/usuariosService');

async function calcularScore(req, res) {
  const { textos = [], jogos = [], eventos = [], compras = [] } = req.body;
  const cpf = req.user.cpf;

  if (!textos || !Array.isArray(textos)) {
    return res.status(400).json({ error: 'Envie um array de textos.' });
  }

  try {
    const { scoreFinal, analises } = await analisarRedesSociais(textos);

    const scoreEventos = eventos.length * 5;
    const scorecompras = compras.length * 5;

    const scoreTotal = Math.min(scoreFinal + scoreEventos + scorecompras, 100);

    const jogosStr = Array.isArray(jogos) ? jogos.join(', ') : jogos;
    const eventosStr = Array.isArray(eventos) ? eventos.join(', ') : eventos;
    const comprasStr = Array.isArray(compras) ? compras.join(', ') : compras;

    await createOrUpdate(cpf, jogosStr, eventosStr, comprasStr);

    await atualizarScoreUsuario(cpf, scoreTotal);

    return res.json({
      scoreFinal: scoreTotal,
      analises,
      eventosParticipados: eventos.length,
      comprasComprados: compras.length,
      jogos: jogos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao calcular score.' });
  }
}

const analisarRedesSociais = async (textos) => {

  if (!textos || !Array.isArray(textos)) {
    throw new Error('Envie um array de textos.');
  }

  let totalScore = 0;

  const resultados = await Promise.all(
    textos.map(async (texto) => {
      const resultado = await analisarTextoComHuggingFace(texto);
      totalScore += resultado.score;
      return resultado;
    })
  );

  return {
    scoreFinal: Math.min(Math.round(totalScore / textos.length), 100),
    analises: resultados
  };
};

module.exports = { analisarRedesSociais, calcularScore };
