import { BaseRepository } from "./BaseRepository";
import { Livro } from "../modelos/Livro";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de livros na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
interface LivrosRepository extends BaseRepository<Livro, string> {
  /**
   *
   * Método que busca por um registro de um
   * livro na base de dados da aplicação a
   * partir do código ISBN do livro.
   *
   * @param isbn Código ISBN do livro pesquisado.
   * @returns Dados do livro encontrado.
   */
  buscarPorIsbn(isbn: string): Promise<Livro>;
}

export { LivrosRepository };
