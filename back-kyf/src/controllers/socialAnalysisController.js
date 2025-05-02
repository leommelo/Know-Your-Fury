const { analisarTextoComHuggingFace } = require('../services/huggingFaceService');

async function calcularScore(req, res) {
    const { textos = [], eventos = [], produtos = [] } = req.body;

    if (!textos || !Array.isArray(textos)) {
        return res.status(400).json({ error: 'Envie um array de textos.' });
      }
    
  
    try {
      // Chama função separada para analisar só os textos
      const { scoreFinal, analises } = await analisarRedesSociais(textos);
  
      const scoreEventos = eventos.length * 5;
      const scoreProdutos = produtos.length * 5;
  
      const scoreTotal = Math.min(scoreFinal + scoreEventos + scoreProdutos, 100);
  
      return res.json({
        scoreFinal: scoreTotal,
        analises,
        eventosParticipados: eventos.length,
        produtosComprados: produtos.length
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
