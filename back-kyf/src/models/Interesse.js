const db = require('../config/db');

const Interesse = {
  findByCpf: async (cpf) => {
    const [rows] = await db.execute('SELECT jogos, eventos, compras FROM interesses WHERE cpf = ?', [cpf]);
    return rows[0]; // Retorna os interesses do usuário
  },

  findUserWithInterests: async (cpf) => {
    const [rows] = await db.execute(
      `SELECT u.cpf, u.nome, u.data_nascimento, i.jogos, i.eventos, i.compras
       FROM usuarios u
       LEFT JOIN interesses i ON u.cpf = i.cpf
       WHERE u.cpf = ?`,
      [cpf]
    );
    return rows[0]; // Retorna o primeiro resultado (usuário + interesses)
  },

  createOrUpdate: async (cpf, jogos, eventos, compras) => {
    await db.execute(
      `INSERT INTO interesses (cpf, jogos, eventos, compras)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE jogos = ?, eventos = ?, compras = ?`,
      [cpf, jogos, eventos, compras, jogos, eventos, compras]
    );
  },
};

module.exports = Interesse;