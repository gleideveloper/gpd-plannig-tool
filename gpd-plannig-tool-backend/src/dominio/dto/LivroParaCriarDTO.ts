type LivroParaCriarDTO = {
  nome: string;
  sinopse: string;
  isbn: string;
  autores: string[];
  urlImagem?: string;
};

export { LivroParaCriarDTO };
