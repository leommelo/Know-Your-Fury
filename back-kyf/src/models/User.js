const db = require('../config/db');

const User = {

  findByCpf: async (cpf) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE cpf = ?', [cpf]);
    return rows[0]; // Retorna o primeiro usuário encontrado
  },

  create: async (cpf, nome, data_nascimento) => {
    await db.execute('INSERT INTO usuarios (cpf, nome, data_nascimento) VALUES (?, ?, ?)', [
      cpf, nome, data_nascimento,
    ]);
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
  },
};

module.exports = User;