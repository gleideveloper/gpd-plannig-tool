import { BaseRepository } from "./BaseRepository";
import { Role } from "../modelos/Role";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de roles na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
interface RolesRepository extends BaseRepository<Role, string> {
  /**
   *
   * Método que busca por um registro de um
   * role na base de dados da aplicação a
   * partir do role_name do role.
   *
   * @param role_name Tipo do role pesquisado.
   * @returns Dados do role encontrado.
   */
  buscarPorName(role_name: string): Promise<Role>;
}

export { RolesRepository };
