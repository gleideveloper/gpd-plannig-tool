import {Logger} from "@/common/Logger";
import {RegistroNaoEncontradoError} from "@/dominio/excecoes/RegistroNaoEncontradoError";
import {RegistroNaoSalvoError} from "@/dominio/excecoes/RegistroNaoSalvoError";
import {ValidacaoError} from "@/dominio/excecoes/ValidacaoError";
import {Produto} from "@/dominio/modelos/Produto";
import {ProdutosRepository} from "@/dominio/repositorios/ProdutosRepository";

import {ValidationError} from "sequelize";

/**
 *
 * Classe que implementa as operações de manipulação
 * de registros de produtos no banco de dados da aplicação,
 * implementando a utilização do framework ORM Sequelize.
 *
 * Esta classe implementa a interface {@link ProdutosRepository}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class SequelizeProdutosRepository implements ProdutosRepository {
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
   * @see {@link ProdutosRepository.buscarTodos}
   */
  public async buscarTodos(): Promise<Produto[]> {
    return await Produto.findAll();
  }

  /**
   *
   * Implementação do método que busca por
   * um registro de um objeto na base de
   * dados da aplicação a partir de um ID.
   *
   * @see {@link ProdutosRepository.buscarPorId}
   * @throws {RegistroNaoEncontradoError} O produto não foi encontrado.
   */
  public async buscarPorId(id: string): Promise<Produto> {
    const produto = await Produto.findOne({
      where: {
        id: id,
      },
    });

    if (produto === null)
      throw new RegistroNaoEncontradoError(
        `O produto de ID ${id} não foi encontrado.`
      );

    return produto;
  }

  /**
   *
   * Implementação do método que verifica se
   * um registro com um determinado ID existe
   * na base de dados da aplicação.
   *
   * @see {@link ProdutosRepository.existe}
   */
  public async existe(id: string): Promise<boolean> {
    const resultado = await Produto.findOne({
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
   * @see {@link ProdutosRepository.remover}
   */
  public async remover(id: string): Promise<number> {
    return await Produto.destroy({
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
   * @see {@link ProdutosRepository.salvar}
   */
  public async salvar(produto: Produto): Promise<Produto> {
    let produtoSalvo: Produto | null = null;
    const produtoExiste = await this.existe(produto.id as string);

    if (produtoExiste) produtoSalvo = await this.atualizarProduto(produto);
    else produtoSalvo = await this.criarNovoProduto(produto);

    return produtoSalvo;
  }

  /**
   *
   * Implementação do método que busca por um
   * registro de um produto na base de dados da
   * aplicação a partir do código ISBN do produto.
   *
   * @see {@link ProdutosRepository.buscarPorIsbn}
   * @throws {RegistroNaoEncontradoError} O produto não foi encontrado.
   */
  // public async buscarPorFamilia(familia:string): Promise<Produto> {
  //   const produto = await Produto.findOne({
  //     where: {
  //         familia: familia,
  //     },
  //   });
  //
  //   if (produto === null)
  //     throw new RegistroNaoEncontradoError(
  //       `O produto com a familia ISBN ${familia} não foi encontrado.`
  //     );
  //
  //   return produto;
  // }

  /**
   *
   * Método que insere um novo produto na base de dados
   * da aplicação.
   *
   * @param produto Dados do novo produto.
   * @returns Instância do novo produto inserido.
   * @throws {RegistroNaoSalvoError} Houve uma falha ao criar um novo produto.
   */
  private async criarNovoProduto(produto: Produto): Promise<Produto> {
    try {
      return await Produto.create(
        {
          nome: produto.nome,
          dataSa: produto.data_sa,
          lider: produto.lider_npi,
          template_type: produto.template_type,
        },
        {
          returning: true,
        }
      );
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
        const mensagem = `Falha ao criar um novo produto ${produto.nome}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  /**
   *
   * Método que atualiza os dados de um produto na base
   * de dados da aplicação.
   *
   * @param produto Dados do produto a ser atualizado.
   * @returns Instância do produto atualizado.
   */
  private async atualizarProduto(produto: Produto): Promise<Produto> {
    try {
      let produtoBanco = await this.buscarPorId(produto.id as string);

      return await produtoBanco.update({
          nome: produto.nome,
          dataSa: produto.data_sa,
          lider: produto.lider_npi,
          template: produto.template,
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
        const mensagem = `Falha ao atualizar um produto ${produto.nome}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeProdutosRepository };
