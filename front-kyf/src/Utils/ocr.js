import Tesseract from 'tesseract.js';
import { distance } from 'fastest-levenshtein';

export const extractTextFromImage = async (imageFile) => {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imageFile,
      'por', // Idioma português
      { logger: (m) => console.log(m) }
    );
    return text;
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    return null;
  }
};

export const validateRGData = (text, cpf, nome) => {
  const textoNormalizado = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const nomeNormalizado = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cpfLimpo = cpf.replace(/\D/g, '');

  const textoNumerico = textoNormalizado.replace(/\D/g, '');
  console.log("Texto numérico:", textoNumerico);
  console.log("CPF alvo:", cpfLimpo);

  const cpfEncontrado = findCPFInText(textoNumerico, cpfLimpo);
  console.log("CPF encontrado:", cpfEncontrado);
  console.log("Nome encontrado:", textoNormalizado.includes(nomeNormalizado));

  return (
    textoNormalizado.includes(nomeNormalizado) &&
    cpfEncontrado
  );
};

// Função melhorada para buscar CPF no texto com tolerância máxima de 1 dígito
function findCPFInText(texto, cpfAlvo) {
  // Estratégia 1: Verificar por sequências numéricas que podem ser o CPF
  const matches = texto.match(/\d{9,11}/g) || [];
  
  // Verifica se o CPF alvo completo está contido no texto
  if (texto.includes(cpfAlvo)) {
    return true;
  }
  
  // Verifica se alguma sequência está próxima do CPF alvo (com tolerância de erro)
  for (const match of matches) {
    if (distance(match, cpfAlvo) <= 1) { // Reduzido para 1
      return true;
    }
  }
  
  // Estratégia 2: Busca por subsequências do CPF (para casos onde está fragmentado)
  // Verifica se ao menos 9 dígitos consecutivos do CPF estão presentes
  if (cpfAlvo.length === 11) {
    const primeiros9 = cpfAlvo.substring(0, 9);
    const primeiros10 = cpfAlvo.substring(0, 10);
    
    if (texto.includes(primeiros9) || texto.includes(primeiros10)) {
      return true;
    }
    
    // Verifica se os 9 primeiros dígitos estão presentes com tolerância de erro
    for (const match of matches) {
      if (match.length >= 9 && distance(match.substring(0, 9), primeiros9) <= 1) {
        return true;
      }
      
      if (match.length >= 10 && distance(match.substring(0, 10), primeiros10) <= 1) {
        return true;
      }
    }
  }
  
  return false;
}