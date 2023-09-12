/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros na base de
 * dados da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
interface BaseRepository<K, V> {
  /**
   *
   * Método que busca todos os registros da base
   * de dados da aplicação.
   *
   * @returns Lista de objetos encontrados.
   */
  buscarTodos(): Promise<K[]>;

  /**
   *
   * Método que busca por um registro de um
   * objeto na base de dados da aplicação a
   * partir de um ID.
   *
   * @param id ID do registro pesquisado.
   * @return Objeto encontrado.
   */
  buscarPorId(id: V): Promise<K>;

  /**
   *
   * Método que verifica se um registro com
   * um determinado ID existe na base de
   * dados da aplicação.
   *
   * @param id ID do registro pesquisado.
   * @return **Verdadeiro** se o registro existe na base de dados; **Falso** caso contrário.
   */
  existe(id: V): Promise<boolean>;

  /**
   *
   * Método que remove um registro da base de
   * dados da aplicação a partir de um ID.
   *
   * @param id ID do registro a ser removido.
   */
  remover(id: V): Promise<any>;

  /**
   *
   * Método que salva um registro de um objeto
   * na base de dados da aplicação.
   * @param registro Registro a ser salvo.
   */
  salvar(registro: K): Promise<any>;
}

export { BaseRepository };
