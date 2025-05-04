const mysql = require('mysql2');
require('dotenv').config();

const connectionString = process.env.MYSQL_URL;

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
