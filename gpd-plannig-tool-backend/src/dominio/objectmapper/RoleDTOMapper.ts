import { ObjectMapper } from "@/common/ObjectMapper";
import { Role } from "../modelos/Role";
import {RoleDTO} from "@/dominio/dto/RoleDTO";

/**
 *
 * Implementação da interface de mapeamento de objetos
 * de origem {@link Role} para objetos de
 * destino {@link RoleDTO}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class RoleDTOMapper extends ObjectMapper<Role, RoleDTO> {
  public constructor() {
    super();
  }

  /**
   *
   * Implementação do método que mapeia um objeto de
   * origem {@link Role} para um objeto
   * de destino {@link RoleDTO}.
   */
  public async mapearOrigemParaDestino(modelo: Role): Promise<RoleDTO> {
    return {
      role_name: modelo.role_name,
      description: modelo.description,
    };
  }
}

export { RoleDTOMapper };
