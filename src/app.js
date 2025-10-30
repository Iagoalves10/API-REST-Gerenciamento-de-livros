const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Importa as rotas de livros

const app = express();


// Conectando ao MongoDB
mongoose.connect('mongodb+srv://dba:TesteLivroApi@livroapiteste.jgk7w.mongodb.net/?retryWrites=true&w=majority&appName=LivroApiTeste', 
).then(() => {
    console.log('Conectado ao MongoDB com sucesso');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Middleware para permitir o uso de JSON no body das requisições
app.use(express.json());

// Define o prefixo '/api/livros' para todas as rotas importadas de 'routes.js'
// Isso está correto.
app.use('/api/livros', routes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
