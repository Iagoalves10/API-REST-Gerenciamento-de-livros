const express = require('express');
const Livro = require('./models'); // Importa o modelo de livro
const router = express.Router();

// Endpoint para cadastro de livros
router.post('/', async (req, res) => {
    const { titulo, autor, editora, anoPublicacao, numeroPaginas } = req.body;

    // Validação dos campos obrigatórios
    if (!titulo || !autor || !editora || !anoPublicacao || !numeroPaginas) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Criação do novo livro
        const novoLivro = new Livro({ titulo, autor, editora, anoPublicacao, numeroPaginas });
        await novoLivro.save();
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar o livro.' });
    }
});

// Endpoint para listar todos os livros
router.get('/', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os livros.' });
    }
});

// Endpoint para consultar um livro por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findById(id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }
        res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o livro.' });
    }
});

// Endpoint para remover um livro por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findByIdAndDelete(id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }
        res.status(200).json({ message: 'Livro removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover o livro.' });
    }
});

// ✅ PUT - Atualizar um livro existente (AJUSTADO PARA O CYPRESS)
// Rota final: PUT /api/livros/:id
router.put('/:id', async (req, res) => {
        try {
          const { id } = req.params;
      
          // Validação do formato do ID
          if (!id || id.length !== 24) {
            return res.status(400).json({ message: 'ID inválido.' });
          }
      
          // Campos permitidos para atualização
          const camposPermitidos = [
            'titulo',
            'autor',
            'editora',
            'anoPublicacao',
            'numeroPaginas'
          ];
      
          // Filtra apenas os campos válidos enviados
          const dadosAtualizados = {};
          camposPermitidos.forEach(campo => {
            if (req.body[campo] !== undefined) {
              dadosAtualizados[campo] = req.body[campo];
            }
          });
      
          // Atualiza o livro e retorna o novo documento
          const livroAtualizado = await Livro.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true, runValidators: true }
          );
      
          if (!livroAtualizado) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
          }
      
          // AGORA RETORNA O OBJETO DO LIVRO DIRETAMENTE, PARA PASSAR NO CYPRESS
          res.status(200).json(livroAtualizado); 
      
        } catch (error) {
          res.status(500).json({
            message: '❌ Erro ao atualizar o livro',
            error: error.message
          });
        }
      });
  
  module.exports = router;