import { Usuario } from "../modelos/Usuario";

export interface UsuariosRepository {
  buscarTodos(): Promise<Usuario[]>;
  buscarPorId(id: string): Promise<Usuario>;
  salvar(usuario: Usuario): Promise<Usuario>;
  remover(id: string): Promise<number>; // Retorna a contagem de registros removidos (geralmente 1 ou 0)
  // Mais metodos
}
