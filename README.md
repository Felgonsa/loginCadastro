# Sistema de Cadastro e Login com Node.js

Este projeto é um sistema simples de cadastro e login full stack, desenvolvido em Node.js com PostgreSQL no backend e HTML/JavaScript puro no frontend. Ele permite o cadastro, login e visualização de usuários autenticados.

## Funcionalidades

- Cadastro de novos usuários com nome, e-mail e senha
- Hash de senhas com `bcrypt`
- Login com verificação de credenciais
- Geração de token JWT para autenticação
- Middleware de proteção de rotas privadas
- Logout simples 

## Tecnologias utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **Bcrypt**
- **HTML/CSS/JS**

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. instale as dependências 
   npm install

3. Crie um arquivo .env e insira, além de conectar com seu banco de dados
 JWT_SECRET= ** sua_chave_secreta_aqui ** 

4. Configure seu banco de dados com a tabela usuário
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

5. Inicie o servidor 
 node index.js

6. Acesse
http://localhost:5000


Autor -- [Felipe Gonçalves de Souza](https://github.com/Felgonsa)

