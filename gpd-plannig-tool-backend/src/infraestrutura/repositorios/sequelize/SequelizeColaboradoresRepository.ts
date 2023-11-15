import {Logger} from "@/common/Logger";
import {RegistroNaoEncontradoError} from "@/dominio/excecoes/RegistroNaoEncontradoError";
import {RegistroNaoSalvoError} from "@/dominio/excecoes/RegistroNaoSalvoError";
import {ValidacaoError} from "@/dominio/excecoes/ValidacaoError";
import {Colaborador} from "@/dominio/modelos/Colaborador";
import {ColaboradoresRepository} from "@/dominio/repositorios/ColaboradoresRepository";

import {ValidationError} from "sequelize";
import {Template} from "@/dominio/modelos/Template";
import {Role} from "@/dominio/modelos/Role";

/**
 *
 * Classe que implementa as operações de manipulação
 * de registros de produtos no banco de dados da aplicação,
 * implementando a utilização do framework ORM Sequelize.
 *
 * Esta classe implementa a interface {@link ColaboradoresRepository}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com> and Laura Lima
 */
class SequelizeColaboradoresRepository implements ColaboradoresRepository {
  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.logger = Logger.pegarInstancia();
  }

  public async buscarPorTipo(tipo: string): Promise<Colaborador[]> {
    return Colaborador.findAll({
      where: {
        'role_name': tipo
      }
    });
  }

  /**
   *
   * Implementação do método que busca todos
   * os registros da base de dados da aplicação.
   *
   * @see {@link ColaboradoresRepository.buscarTodos}
   */
  public async buscarTodos(): Promise<Colaborador[]> {
      return Colaborador.findAll({
          attributes: ['id', 'nome', 'departamento', 'role_name'],
          include: Role, // Inclui o modelo Template na consulta
      });
  }
  /**
   *
   * Implementação do método que busca por
   * um registro de um objeto na base de
   * dados da aplicação a partir de um ID.
   *
   * @see {@link ColaboradoresRepository.buscarPorId}
   * @throws {RegistroNaoEncontradoError} O colaborador não foi encontrado.
   */
  public async buscarPorId(id: string): Promise<Colaborador> {
    const colaborador = await Colaborador.findOne({
      where: {
        id: id,
      },
    });

    if (colaborador === null)
      throw new RegistroNaoEncontradoError(
        `O colaborador de ID ${id} não foi encontrado.`
      );

    return colaborador;
  }

  /**
   *
   * Implementação do método que verifica se
   * um registro com um determinado ID existe
   * na base de dados da aplicação.
   *
   * @see {@link ColaboradoresRepository.existe}
   */
  public async existe(id: string): Promise<boolean> {
    const resultado = await Colaborador.findOne({
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
   * @see {@link ColaboradoresRepository.remover}
   */
  public async remover(id: string): Promise<number> {
    return await Colaborador.destroy({
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
   * @see {@link ColaboradoresRepository.salvar}
   */
  public async salvar(colaborador: Colaborador): Promise<Colaborador> {
    console.log(`Repository Salvar: ${colaborador}`)
    let produtoSalvo: Colaborador | null = null;
    const produtoExiste = await this.existe(colaborador.id as string);

    if (produtoExiste) produtoSalvo = await this.atualizarProduto(colaborador);
    else produtoSalvo = await this.criarNovoProduto(colaborador);

    return produtoSalvo;
  }

  /**
   *
   * Método que insere um novo colaborador na base de dados
   * da aplicação.
   *
   * @param colaborador Dados do novo colaborador.
   * @returns Instância do novo colaborador inserido.
   * @throws {RegistroNaoSalvoError} Houve uma falha ao criar um novo colaborador.
   */
  private async criarNovoProduto(colaborador: Colaborador): Promise<Colaborador> {
      console.log(`Repository ProdutoNovo: ${colaborador}`)
      try {
          // Cria um novo colaborador usando a desestruturação do objeto.
          return await Colaborador.create({
              nome: colaborador.nome,
              departamento: colaborador.departamento,
              id_role: colaborador.id,
          }, {
              returning: true, // Isso é opcional, dependendo de suas necessidades.
          });
      } catch (erro: any) {
          if (erro instanceof ValidationError) {
              // Tratar erros de validação, se aplicável.
              const mensagem = "Há valores inválidos em alguns campos.";
              const errosValidacao = {};

              for (const itemErro of erro.errors) {
                  const campo = itemErro.path as string;
                  errosValidacao[campo] = itemErro.message;
              }

        this.logger.error(mensagem);
        this.logger.error(JSON.stringify(errosValidacao));

        throw new ValidacaoError(mensagem, errosValidacao);
      } else {
        const mensagem = `Falha ao criar um novo colaborador ${colaborador.nome}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  /**
   *
   * Método que atualiza os dados de um colaborador na base
   * de dados da aplicação.
   *
   * @param colaborador Dados do colaborador a ser atualizado.
   * @returns Instância do colaborador atualizado.
   */
  private async atualizarProduto(colaborador: Colaborador): Promise<Colaborador> {
    try {
      let produtoBanco = await this.buscarPorId(colaborador.id as string);

      return await produtoBanco.update({
          nome: colaborador.nome,
          departamento: colaborador.departamento,
          id_role: colaborador.id,
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
        const mensagem = `Falha ao atualizar um colaborador ${colaborador.nome}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeColaboradoresRepository };
