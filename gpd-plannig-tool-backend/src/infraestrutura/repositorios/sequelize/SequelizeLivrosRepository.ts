import { Logger } from "@/common/Logger";
import { ISBNUnicoError } from "@/dominio/excecoes/ISBNUnicoError";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ValidacaoError } from "@/dominio/excecoes/ValidacaoError";
import { Livro } from "@/dominio/modelos/Livro";
import { LivrosRepository } from "@/dominio/repositorios/LivrosRepository";

import { UniqueConstraintError, ValidationError } from "sequelize";

/**
 *
 * Classe que implementa as operações de manipulação
 * de registros de livros no banco de dados da aplicação,
 * implementando a utilização do framework ORM Sequelize.
 *
 * Esta classe implementa a interface {@link LivrosRepository}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class SequelizeLivrosRepository implements LivrosRepository {
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
   * @see {@link LivrosRepository.buscarTodos}
   */
  public async buscarTodos(): Promise<Livro[]> {
    return await Livro.findAll();
  }

  /**
   *
   * Implementação do método que busca por
   * um registro de um objeto na base de
   * dados da aplicação a partir de um ID.
   *
   * @see {@link LivrosRepository.buscarPorId}
   * @throws {RegistroNaoEncontradoError} O livro não foi encontrado.
   */
  public async buscarPorId(id: string): Promise<Livro> {
    const livro = await Livro.findOne({
      where: {
        id: id,
      },
    });

    if (livro === null)
      throw new RegistroNaoEncontradoError(
        `O livro de ID ${id} não foi encontrado.`
      );

    return livro;
  }

  /**
   *
   * Implementação do método que verifica se
   * um registro com um determinado ID existe
   * na base de dados da aplicação.
   *
   * @see {@link LivrosRepository.existe}
   */
  public async existe(id: string): Promise<boolean> {
    const resultado = await Livro.findOne({
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
   * @see {@link LivrosRepository.remover}
   */
  public async remover(id: string): Promise<number> {
    return await Livro.destroy({
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
   * @see {@link LivrosRepository.salvar}
   */
  public async salvar(livro: Livro): Promise<Livro> {
    let livroSalvo: Livro | null = null;
    const livroExiste = await this.existe(livro.id as string);

    if (livroExiste) livroSalvo = await this.atualizarLivro(livro);
    else livroSalvo = await this.criarNovoLivro(livro);

    return livroSalvo;
  }

  /**
   *
   * Implementação do método que busca por um
   * registro de um livro na base de dados da
   * aplicação a partir do código ISBN do livro.
   *
   * @see {@link LivrosRepository.buscarPorIsbn}
   * @throws {RegistroNaoEncontradoError} O livro não foi encontrado.
   */
  public async buscarPorIsbn(isbn: string): Promise<Livro> {
    const livro = await Livro.findOne({
      where: {
        isbn: isbn,
      },
    });

    if (livro === null)
      throw new RegistroNaoEncontradoError(
        `O livro com código ISBN ${isbn} não foi encontrado.`
      );

    return livro;
  }

  /**
   *
   * Método que insere um novo livro na base de dados
   * da aplicação.
   *
   * @param livro Dados do novo livro.
   * @returns Instância do novo livro inserido.
   * @throws {RegistroNaoSalvoError} Houve uma falha ao criar um novo livro.
   */
  private async criarNovoLivro(livro: Livro): Promise<Livro> {
    try {
      return await Livro.create(
        {
          nome: livro.nome,
          sinopse: livro.sinopse,
          isbn: livro.isbn,
          urlImagem: livro.urlImagem,
          autores: livro.autores,
        },
        {
          returning: true,
        }
      );
    } catch (erro: any) {
      if (erro instanceof UniqueConstraintError) {
        const mensagem = `O código ISBN ${livro.isbn} já está associado a um livro.`;

        this.logger.error(mensagem);

        throw new ISBNUnicoError(mensagem);
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
        const mensagem = `Falha ao criar um novo livro com código ISBN ${livro.isbn}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  /**
   *
   * Método que atualiza os dados de um livro na base
   * de dados da aplicação.
   *
   * @param livro Dados do livro a ser atualizado.
   * @returns Instância do livro atualizado.
   */
  private async atualizarLivro(livro: Livro): Promise<Livro> {
    try {
      let livroBanco = await this.buscarPorId(livro.id as string);

      return await livroBanco.update({
        nome: livro.nome,
        sinopse: livro.sinopse,
        urlImagem: livro.urlImagem,
        autores: livro.autores,
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
        const mensagem = `Falha ao atualizar um livro com código ISBN ${livro.isbn}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeLivrosRepository };
