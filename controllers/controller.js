const pool = require('../db/db.js') // Importa a pool de conexões do PostgreSQL   
const jwt = require('jsonwebtoken') // Importa o jsonwebtoken para gerar tokens
require('dotenv').config() // Carrega as variáveis de ambiente do arquivo .env
const bcrypt = require('bcrypt') // Importa o bcrypt para hash de senhas
const express = require('express') // Importa o express para criar o servidor
const autenticarToken = require('../middleware/auth.js')
const router = express.Router() // Cria um roteador Express
const path = require('path') // Importa o path para manipulação de caminhos de arquivos


router.post('/cadastro.html', async (req, res) => {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    try {
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
            [nome, email, senhaHash]
        );
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        res.status(400).send('Erro ao cadastrar usuário: ' + err.message);
    }
});



router.post('/login', async (req, res) => {

    const { email, senha } = req.body // Extrai os dados do corpo da requisição

    try {

        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]) // Busca o usuário no banco de dados
        const usuario = result.rows[0] // Pega o primeiro resultado da busca





        if (!usuario) {

            return res.status(401).json({ message: 'Usuário não encontrado' }) // Se não encontrar, responde com erro
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha) // Compara a senha informada com a senha do banco de dados


        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida' }) // Se a senha não for válida, responde com erro
        }

        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET

            , { expiresIn: '1h' }) // Gera um token JWT com o id do usuário e uma chave secreta

        return res.status(200).json({ message: 'Login realizado com sucesso ' + usuario.nome, token }) // Se o login for bem-sucedido, responde com sucesso


    } catch (error) {
        console.log(error) // Loga o erro no console
        res.status(500).json({ message: 'Erro no login' , error}) // Se houver erro, responde com erro
    }

}

)

router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
      const result = await pool.query('SELECT id, nome, email FROM usuarios');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  });

module.exports = router
