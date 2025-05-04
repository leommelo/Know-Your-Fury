const mysql = require('mysql2');
require('dotenv').config();

// Usar a URL completa de conexão
const connectionString = process.env.DATABASE_URL || 
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = mysql.createPool(connectionString);

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    console.error('String de conexão utilizada (sem senha):', 
      connectionString.replace(/:([^:@]+)@/, ':***@'));
  } else {
    console.log('Conectado ao MySQL com sucesso!');
    conn.release();
  }
});

module.exports = pool.promise();