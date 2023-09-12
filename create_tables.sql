USE
loja-livros

CREATE TABLE IF NOT EXISTS livros
(
    id VARCHAR
(
    36
) PRIMARY KEY,
    nome VARCHAR
(
    180
) NOT NULL,
    sinopse TEXT NOT NULL,
    isbn VARCHAR
(
    13
) NOT NULL UNIQUE,
    autores JSON NOT NULL,
    url_imagem TEXT
    );