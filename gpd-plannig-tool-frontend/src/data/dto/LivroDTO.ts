interface LivroDTO {
  nome: string;
  isbn: string;
  sinopse: string;
  autores: string[];
  urlImagem?: string;
}

export { LivroDTO };
