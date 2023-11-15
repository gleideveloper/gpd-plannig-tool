import {Logger} from "@/common/Logger";
import {RegistroNaoEncontradoError} from "@/dominio/excecoes/RegistroNaoEncontradoError";
import {Role} from "@/dominio/modelos/Role";
import {RolesRepository} from "@/dominio/repositorios/RolesRepository";

/**
 *
 * Classe que implementa as operações de manipulação
 * de registros de roles no banco de dados da aplicação,
 * implementando a utilização do framework ORM Sequelize.
 *
 * Esta classe implementa a interface {@link RolesRepository}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class SequelizeRolesRepository implements RolesRepository {
  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.logger = Logger.pegarInstancia();
  }

  /**
   *
   * Implementação do método que busca todos
   * os registros da base de dados da aplicação.
   *
   * @see {@link RolesRepository.buscarTodos}
   */
  public async buscarTodos(): Promise<Role[]> {
    return await Role.findAll();
  }

  /**
   *
   * Implementação do método que busca por
   * um registro de um objeto na base de
   * dados da aplicação a partir de um ID.
   *
   * @see {@link RolesRepository.buscarPorId}
   * @throws {RegistroNaoEncontradoError} O role não foi encontrado.
   */
  public async buscarPorId(id: string): Promise<Role> {
    const role = await Role.findOne({
      where: {
        id: id,
      },
    });

    if (role === null)
      throw new RegistroNaoEncontradoError(
        `O role de ID ${id} não foi encontrado.`
      );

    return role;
  }

  /**
   *
   * Implementação do método que busca por um
   * registro de uma role na base de dados da
   * aplicação a partir do role_name do role.
   *
   * @see {@link RolesRepository.buscarPorTipo}
   * @throws {RegistroNaoEncontradoError} O role não foi encontrado.
   */
  public async buscarPorName(role_name: string): Promise<Role> {
    const role = await Role.findOne({
      where: {
        role_name: role_name,
      },
    });

    if (role === null)
      throw new RegistroNaoEncontradoError(
        `O role com role_name ${role_name} não foi encontrada.`
      );

    return role;
  }

    existe(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    remover(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    salvar(registro: Role): Promise<any> {
        return Promise.resolve(undefined);
    }
}

export { SequelizeRolesRepository };
