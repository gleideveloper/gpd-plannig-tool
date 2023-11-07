import {RoleDTO} from "../dto/RoleDTO";
import {RoleDTOMapper} from "../objectmapper/RoleDTOMapper";
import {RolesRepository} from "../repositorios/RolesRepository";

/**
 *
 * Classe de serviço que executa as regras de
 * negócio de roles na aplicação.
 *
 * @author Glerole_namees Vinente <glerole_nameevelop@gmail.com>
 */
class RolesService {
  /**
   *
   * Instância de um repositório de roles.
   */
  private repository: RolesRepository;

  /**
   *
   * Instância de um mapeador de objetos.
   */
  private objectMapper: RoleDTOMapper;

  /**
   *
   * Recebemos as dependências da classe
   * pelo construtor, implementando o padrão
   * de projetos Injeção de Dependências.
   *
   * @param repository Instância de um repositório de roles.
   * @param objectMapper Instância de um mapeador de objetos.
   */
  public constructor(
    repository: RolesRepository,
    objectMapper: RoleDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  /**
   *
   * Método que busca todos os roles
   * cadastrados na aplicação.
   *
   * @returns Lista de roles.
   */
  public async buscarTodos(): Promise<RoleDTO[]> {
    const roles = await this.repository.buscarTodos();

    return await this.objectMapper.mapearListaOrigemParaListaDestino(roles);
  }
  

  /**
   *
   * Método que busca os dados de um role
   * a partir de um código ISBN.
   *
   * @param role_name Código do role pesquisado.
   * @returns Dados do role.
   */
  public async buscarRolePorName(role_name: string): Promise<RoleDTO> {
    const role = await this.repository.buscarPorName(role_name);

    return await this.objectMapper.mapearOrigemParaDestino(role);
  }
}

export { RolesService };
