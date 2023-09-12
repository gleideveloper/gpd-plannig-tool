/**
 *
 * Definição de tipo DTO que encapsula os dados
 * de um livro.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
type LivroDTO = {
  nome: string;
  sinopse: string;
  isbn: string;
  urlImagem?: string;
  autores: string[];
};

export { LivroDTO };
