require('dotenv').config(); // Carrega o .env

const { Pool } = require('pg');

// Cria uma pool de conexões com base na string do .env
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

// Testa a conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar no PostgreSQL:', err.stack);
  }
  console.log('Conexão com PostgreSQL bem-sucedida!');
  release();
});

module.exports = pool;
