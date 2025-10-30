const mongoose = require('mongoose');

// Definindo o schema do Livro
const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    },
    anoPublicacao: {
        type: Number,
        required: true
    },
    numeroPaginas: {
        type: Number,
        required: true
    }
});

// Criando o modelo Livro
const Livro = mongoose.model('Livro', LivroSchema);

// Exportando o modelo Livro
module.exports = Livro;
