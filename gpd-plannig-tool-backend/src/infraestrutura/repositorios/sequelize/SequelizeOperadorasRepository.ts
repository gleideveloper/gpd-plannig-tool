import { Logger } from "@/common/Logger";
import { NomeUnicoError } from "@/dominio/excecoes/NomeUnicoError";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ValidacaoError } from "@/dominio/excecoes/ValidacaoError";
import { Operadora } from "@/dominio/modelos/Operadora";
import { OperadorasRepository } from "@/dominio/repositorios/OperadorasRepository";

import { UniqueConstraintError, ValidationError } from "sequelize";

/**
 *
 * Classe que implementa as operações de manipulação
 * de registros de operadoras no banco de dados da aplicação,
 * implementando a utilização do framework ORM Sequelize.
 *
 * Esta classe implementa a interface {@link OperadorasRepository}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class SequelizeOperadorasRepository implements OperadorasRepository {
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
   * @see {@link OperadorasRepository.buscarTodos}
   */
  public async buscarTodos(): Promise<Operadora[]> {
    return await Operadora.findAll();
  }

  /**
   *
   * Implementação do método que busca por
   * um registro de um objeto na base de
   * dados da aplicação a partir de um ID.
   *
   * @see {@link OperadorasRepository.buscarPorId}
   * @throws {RegistroNaoEncontradoError} A operadora não foi encontrada.
   */
  public async buscarPorId(id: string): Promise<Operadora> {
    const operadora = await Operadora.findOne({
      where: {
        id: id,
      },
    });

    if (operadora === null)
      throw new RegistroNaoEncontradoError(
        `A operadora de ID ${id} não foi encontrada.`
      );

    return operadora;
  }

  /**
   *
   * Implementação do método que verifica se
   * um registro com um determinado ID existe
   * na base de dados da aplicação.
   *
   * @see {@link OperadorasRepository.existe}
   */
  public async existe(id: string): Promise<boolean> {
    const resultado = await Operadora.findOne({
      where: {
        id: id,
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
   * @see {@link OperadorasRepository.remover}
   */
  public async remover(id: string): Promise<number> {
    return await Operadora.destroy({
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
   * @see {@link OperadorasRepository.salvar}
   */
  public async salvar(operadora: Operadora): Promise<Operadora> {
    let operadoraSalva: Operadora | null = null;
    const operadoraExiste = await this.existe(operadora.id as string);

    if (operadoraExiste) operadoraSalva = await this.atualizarOperadora(operadora);
    else operadoraSalva = await this.criarNovaOperadora(operadora);

    return operadoraSalva;
  }

  /**
   *
   * Implementação do método que busca por um
   * registro de uma operadora na base de dados da
   * aplicação a partir do nome da operadora.
   *
   * @see {@link OperadorasRepository.buscarPorNome}
   * @throws {RegistroNaoEncontradoError} A operadora não foi encontrada.
   */
  public async buscarPorNome(nome: string): Promise<Operadora> {
    const operadora = await Operadora.findOne({
      where: {
        nome: nome,
      },
    });

    if (operadora === null)
      throw new RegistroNaoEncontradoError(
        `O operadora com nome ${nome} não foi encontrada.`
      );

    return operadora;
  }

  /**
   *
   * Método que insere uma nova operadora na base de dados
   * da aplicação.
   *
   * @param operadora Dados da nova operadora.
   * @returns Instância da nova operadora inserida.
   * @throws {RegistroNaoSalvoError} Houve uma falha ao criar uma nova operadora.
   */
  private async criarNovaOperadora(operadora: Operadora): Promise<Operadora> {
    try {
      return await Operadora.create(
        {
          nome: operadora.nome,
          regiao: operadora.regiao,
        },
        {
          returning: true,
        }
      );
    } catch (erro: any) {
      if (erro instanceof UniqueConstraintError) {
        const mensagem = `O nome ${operadora.nome} já está associado a uma operadora.`;

        this.logger.error(mensagem);

        throw new NomeUnicoError(mensagem);
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
        const mensagem = `Falha ao criar uma nova operadora com nome ${operadora.nome}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  /**
   *
   * Método que atualiza os dados de uma operadora na base
   * de dados da aplicação.
   *
   * @param operadora Dados da operadora a ser atualizada.
   * @returns Instância da operadora atualizada.
   */
  private async atualizarOperadora(operadora: Operadora): Promise<Operadora> {
    try {
      let operadoraBanco = await this.buscarPorId(operadora.id as string);

      return await operadoraBanco.update({
        nome: operadora.nome,
        regiao: operadora.regiao,
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
        const mensagem = `Falha ao atualizar uma operadora com nome ${operadora.nome}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeOperadorasRepository };
