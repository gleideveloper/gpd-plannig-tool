/**
 *
 * Definição de tipo DTO que encapsula os dados
 * de um livro para atualizar.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
type LivroParaAtualizarDTO = {
  nome: string;
  sinopse: string;
  autores: string[];
  urlImagem?: string;
};

export { LivroParaAtualizarDTO };
