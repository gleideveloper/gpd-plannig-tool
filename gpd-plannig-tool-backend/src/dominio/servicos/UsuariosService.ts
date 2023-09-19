import { UsuarioDTO } from "../dto/UsuarioDTO";
import { UsuarioParaAtualizarDTO } from "../dto/UsuarioParaAtualizarDTO";
import { UsuarioParaCriarDTO } from "../dto/UsuarioParaCriarDTO";
import { Usuario } from "../modelos/Usuario";
import { UsuarioDTOMapper } from "../objectmapper/UsuarioDTOMapper";
import { UsuariosRepository } from "../repositorios/UsuariosRepository";

class UsuariosService {
  private repository: UsuariosRepository;
  private objectMapper: UsuarioDTOMapper;

  public constructor(
    repository: UsuariosRepository,
    objectMapper: UsuarioDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  public async buscarTodos(): Promise<UsuarioDTO[]> {
    const usuarios = await this.repository.buscarTodos();
    return await this.objectMapper.mapearListaOrigemParaListaDestino(usuarios);
  }

  public async buscarUsuarioPorId(id: string): Promise<UsuarioDTO> {
    const usuario = await this.repository.buscarPorId(id);
    return await this.objectMapper.mapearOrigemParaDestino(usuario);
  }

  public async cadastrarNovoUsuario(
    novoUsuario: UsuarioParaCriarDTO
  ): Promise<UsuarioDTO> {
    const usuario = new Usuario({
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      senha: novoUsuario.senha,
      // Adicione outros campos conforme necessário
    });
    const registro = await this.repository.salvar(usuario);
    return await this.objectMapper.mapearOrigemParaDestino(registro);
  }

  public async atualizarUsuario(
    id: string,
    dadosParaAtualizar: UsuarioParaAtualizarDTO
  ): Promise<UsuarioDTO> {
    const usuario = await this.repository.buscarPorId(id);

    usuario.set({
      nome: dadosParaAtualizar.nome,
      email: dadosParaAtualizar.email,
      // Atualize outros campos conforme necessário
    });
    await this.repository.salvar(usuario);
    return await this.objectMapper.mapearOrigemParaDestino(usuario);
  }

  public async deletarUsuario(id: string): Promise<boolean> {
    const usuario = await this.repository.buscarPorId(id);
    const resultado = await this.repository.remover(usuario.id as string);
    return resultado === 1;
  }
}

export { UsuariosService };

