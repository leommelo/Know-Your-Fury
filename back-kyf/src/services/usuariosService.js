const db = require('../config/db');

async function atualizarScoreUsuario(cpf, score) {
  try {
    const [result] = await db.execute(
      `UPDATE usuarios SET fandometro_score = ? WHERE cpf = ?`,
      [score, cpf]
    );

    if (result.affectedRows === 0) {
      throw new Error('Usuário não encontrado para atualizar score.');
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar score do usuário:', error);
    throw error;
  }
}

module.exports = { atualizarScoreUsuario };
