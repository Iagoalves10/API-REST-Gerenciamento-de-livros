/// <reference types="cypress" />

describe('API de Livros - Testes de CRUD', () => {
  const API_URL = 'http://localhost:3000/api/livros';
  let livroId; // Variável para armazenar o ID do livro criado
  
  // Dados base para a criação
  const novoLivroData = {
    titulo: 'A Arte da Guerra',
    autor: 'Sun Tzu',
    editora: 'Editora Sol',
    anoPublicacao: 1999,
    numeroPaginas: 200
  };

  // Dados para a atualização
  const dadosAtualizados = {
    titulo: 'A Arte da Guerra (Edição Definitiva)',
    editora: 'Editora Lua',
    numeroPaginas: 250
  };

  // 1. POST: Cria um livro e armazena o ID
  it('1. Deve criar um novo livro (POST)', () => {
    cy.request('POST', API_URL, novoLivroData)
      .then((response) => {
        // Verifica o status HTTP e a estrutura do objeto
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('_id');
        expect(response.body.titulo).to.eq(novoLivroData.titulo);

        // Salva o ID para uso em testes posteriores
        livroId = response.body._id;
      });
  });

  // 2. GET: Lista todos os livros (deve incluir o criado)
  it('2. Deve listar todos os livros (GET)', () => {
    cy.request('GET', API_URL)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        // Verifica se o livro recém-criado está na lista
        const livroEncontrado = response.body.find(livro => livro._id === livroId);
        expect(livroEncontrado).to.exist;
        expect(livroEncontrado.titulo).to.eq(novoLivroData.titulo);
      });
  });

  // 3. GET/:id: Busca um livro específico
  it('3. Deve buscar um livro específico (GET /:id)', () => {
    cy.request('GET', `${API_URL}/${livroId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq(livroId);
        expect(response.body.autor).to.eq(novoLivroData.autor);
      });
  });

  // 4. PUT: Atualiza o livro
  it('4. Deve atualizar um livro existente (PUT)', () => {
    cy.request('PUT', `${API_URL}/${livroId}`, dadosAtualizados)
      .then((response) => {
        expect(response.status).to.eq(200);
        // A propriedade 'titulo' agora está diretamente no body, graças ao ajuste na API
        expect(response.body).to.have.property('titulo', dadosAtualizados.titulo);
        expect(response.body).to.have.property('editora', dadosAtualizados.editora);
        expect(response.body._id).to.eq(livroId);
      });
  });

  // 5. DELETE: Remove o livro
  it('5. Deve excluir um livro existente (DELETE)', () => {
    cy.request('DELETE', `${API_URL}/${livroId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Livro removido com sucesso.');

        // Tenta buscar o livro deletado para garantir que ele não existe mais
        cy.request({
          method: 'GET',
          url: `${API_URL}/${livroId}`,
          failOnStatusCode: false // Permite capturar o 404
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(404);
          expect(getResponse.body.error).to.eq('Livro não encontrado.');
        });
      });
  });
});
