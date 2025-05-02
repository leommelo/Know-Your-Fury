const axios = require('axios');

const token = process.env.HUGGINGFACE_TOKEN;
const model = 'facebook/bart-large-mnli';

const palavrasChave = require('../utils/keywords')
const labels = ["fã da FURIA", "odeia a FURIA", "neutro"];


const analisarTextoComHuggingFace = async (texto) => {
    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            {
                inputs: texto,
                parameters: {
                    candidate_labels: labels,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { labels: resLabels, scores } = response.data;

        const scoreFuria = resLabels.includes("fã da FURIA") ? scores[resLabels.indexOf("fã da FURIA")] : 0;

        let score = scoreFuria * 100;

        const textoLower = texto.toLowerCase();

        //Comentários negativos
        const palavrasNegativas = ["odeio", "merda", "bosta", "lixo", "otario"];
        const contemOfensas = palavrasNegativas.some(p => textoLower.includes(p));

        //Comentários irrelevantes
        const contemAlgumaPalavraChave = palavrasChave.some(palavra =>
            textoLower.includes(palavra)
        );

        if (contemOfensas || !contemAlgumaPalavraChave) score *= 0.2; 

        return {
            texto,
            score
        };
    } catch (error) {
        console.error(error.message);
        return { texto, erro: 'Falha ao processar.', score: 0 };
    }
};

module.exports = { analisarTextoComHuggingFace };
