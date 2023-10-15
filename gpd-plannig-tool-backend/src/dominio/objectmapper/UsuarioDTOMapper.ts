import { UsuarioDTO } from "../dto/UsuarioDTO";
import { Usuario } from "../modelos/Usuario";

export class UsuarioDTOMapper {
  public mapearOrigemParaDestino(origem: Usuario): UsuarioDTO {
    if (!origem.id) {
        throw new Error("O usuário não possui um ID válido.");
      }

    return {
      id: origem.id,
      nome: origem.nome,
      email: origem.email,
      role: origem.role,
      department: origem.department,
      team: origem.team,
      // Outros campos
    };
  }

  public mapearListaOrigemParaListaDestino(origens: Usuario[]): UsuarioDTO[] {
    return origens.map(this.mapearOrigemParaDestino);
  }
}
