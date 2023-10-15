import { BaseRepository } from "./BaseRepository";
import { Operadora } from "../modelos/Operadora";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de operadoras na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
interface OperadorasRepository extends BaseRepository<Operadora, string> {
  /**
   *
   * Método que busca por um registro de um
   * operadora na base de dados da aplicação a
   * partir do nome da operadora.
   *
   * @param nome Nome da operadora pesquisada.
   * @returns Dados da operadora encontrada.
   */
  buscarPorNome(nome: string): Promise<Operadora>;
}

export { OperadorasRepository };
