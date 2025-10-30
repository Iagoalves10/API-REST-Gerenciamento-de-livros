describe('/livros POST', () => {
  it('Deve cadastrar um novo livro', () => {
    const livro = {
      "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
      "autor": "J.R.R.Tolkien",
      "editora": "HarperCollins",
      "anoPublicacao": 1954,
      "numeroPaginas": 421
    };

    cy.request({
      url: 'http://localhost:3000/api/livros/',
      method: 'POST',
      body: livro
    }).then(response => {
      expect(response.status).to.eql(201)

      cy.log(JSON.stringify(response.body))

      expect(response.body.titulo).to.eql(livro.titulo)
      expect(response.body.autor).to.eql(livro.autor)
      expect(response.body.editora).to.eql(livro.editora)
      expect(response.body.anoPublicacao).to.eql(livro.anoPublicacao)
      expect(response.body.numeroPaginas).to.eql(livro.numeroPaginas)
    });
  });
});
