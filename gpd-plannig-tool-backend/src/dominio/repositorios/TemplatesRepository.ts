import { BaseRepository } from "./BaseRepository";
import { Template } from "../modelos/Template";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de templates na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
interface TemplatesRepository extends BaseRepository<Template, string> {
  /**
   *
   * Método que busca por um registro de um
   * template na base de dados da aplicação a
   * partir do tipo do template.
   *
   * @param tipo Tipo do template pesquisado.
   * @returns Dados do template encontrado.
   */
  buscarPorTipo(tipo: string): Promise<Template>;
}

export { TemplatesRepository };
