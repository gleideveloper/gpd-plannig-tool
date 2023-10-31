import { Logger } from "@/common/Logger";
import { TipoUnicoError } from "@/dominio/excecoes/TipoUnicoError";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ValidacaoError } from "@/dominio/excecoes/ValidacaoError";
import { Role } from "@/dominio/modelos/Role";
import { RolesRepository } from "@/dominio/repositorios/RolesRepository";

import { UniqueConstraintError, ValidationError } from "sequelize";

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
   * Implementação do método que verifica se
   * um registro com um determinado ID existe
   * na base de dados da aplicação.
   *
   * @see {@link RolesRepository.existe}
   */
  public async existe(id: string): Promise<boolean> {
    const resultado = await Role.findOne({
      where: {
        role_type: id,
      },
    });

    return !!resultado === true;
  }

  /**
   *
   * Implementação do método que remove um
   * registro da base de dados da aplicação
   * a partir de um ID.
   *
   * @see {@link RolesRepository.remover}
   */
  public async remover(id: string): Promise<number> {
    return await Role.destroy({
      where: {
        id: id,
      },
    });
  }

  /**
   *
   * Implementação do método que salva um
   * registro de um objeto na base de dados
   * da aplicação.
   *
   * @see {@link RolesRepository.salvar}
   */
  public async salvar(role: Role): Promise<Role> {
    let roleSalva: Role | null = null;
    const roleExiste = await this.existe(role.id as string);

    if (roleExiste) roleSalva = await this.atualizarRole(role);
    else roleSalva = await this.criarNovoRole(role);

    return roleSalva;
  }

  /**
   *
   * Implementação do método que busca por um
   * registro de uma role na base de dados da
   * aplicação a partir do tipo do role.
   *
   * @see {@link RolesRepository.buscarPorTipo}
   * @throws {RegistroNaoEncontradoError} O role não foi encontrado.
   */
  public async buscarPorTipo(tipo: string): Promise<Role> {
    const role = await Role.findOne({
      where: {
        role_type: tipo,
      },
    });

    if (role === null)
      throw new RegistroNaoEncontradoError(
        `O role com tipo ${tipo} não foi encontrada.`
      );

    return role;
  }

  /**
   *
   * Método que insere um novo role na base de dados
   * da aplicação.
   *
   * @param role Dados do novo role.
   * @returns Instância do novo role inserido.
   * @throws {RegistroNaoSalvoError} Houve uma falha ao criar um novo role.
   */
  private async criarNovoRole(role: Role): Promise<Role> {
    try {
      return await Role.create(
        {
          nome: role.nome,
          descricao: role.descricao,
        },
        {
          returning: true,
        }
      );
    } catch (erro: any) {
      if (erro instanceof UniqueConstraintError) {
        const mensagem = `O tipo ${role.id} já está associado a um role.`;

        this.logger.error(mensagem);

        throw new TipoUnicoError(mensagem);
      } else if (erro instanceof ValidationError) {
        const mensagem = "Há valores inválidos em alguns campos.";
        const errosValidacao = {};
        for (let itemErro of erro.errors) {
          const campo = itemErro.path as string;
          const textoValidacao = itemErro.message;
          errosValidacao[campo] = textoValidacao;
        }

        this.logger.error(mensagem);
        this.logger.error(JSON.stringify(errosValidacao));

        throw new ValidacaoError(mensagem, errosValidacao);
      } else {
        const mensagem = `Falha ao criar um novo role com tipo ${role.id}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  /**
   *
   * Método que atualiza os dados de um role na base
   * de dados da aplicação.
   *
   * @param role Dados do role a ser atualizado.
   * @returns Instância do role atualizado.
   */
  private async atualizarRole(role: Role): Promise<Role> {
    try {
      let roleBanco = await this.buscarPorId(role.id as string);

      return await roleBanco.update({
        nome: role.nome,
        descricao: role.descricao,
      });
    } catch (erro: any) {
      if (erro instanceof ValidationError) {
        const mensagem = "Há valores inválidos em alguns campos.";
        const errosValidacao = {};
        for (let itemErro of erro.errors) {
          const campo = itemErro.path as string;
          const textoValidacao = itemErro.message;
          errosValidacao[campo] = textoValidacao;
        }

        this.logger.error(mensagem);
        this.logger.error(JSON.stringify(errosValidacao));

        throw new ValidacaoError(mensagem, errosValidacao);
      } else {
        const mensagem = `Falha ao atualizar um role com tipo ${role.id}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeRolesRepository };
