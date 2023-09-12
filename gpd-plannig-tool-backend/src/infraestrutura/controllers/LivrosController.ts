import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { LivroParaAtualizarDTO } from "@/dominio/dto/LivroParaAtualizarDTO";
import { LivroParaCriarDTO } from "@/dominio/dto/LivroParaCriarDTO";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { LivroDTOMapper } from "@/dominio/objectmapper/LivroDTOMapper";
import { LivrosService } from "@/dominio/servicos/LivrosService";
import { SequelizeLivrosRepository } from "../repositorios/sequelize/SequelizeLivrosRepository";

import { NextFunction, Request, Response } from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/livros**.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class LivrosController {
  /**
   *
   * Instância da classe de serviço de
   * livros.
   */
  private service: LivrosService;

  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.service = new LivrosService(
      new SequelizeLivrosRepository(),
      new LivroDTOMapper()
    );
    this.logger = Logger.pegarInstancia();
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /livros**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   */
  public async buscarTodos(req: Request, res: Response): Promise<void> {
    const livros = await this.service.buscarTodos();

    res.json(livros);
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /livros/:isbn**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async buscarLivroPorIsbn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { isbn } = req.params;
      const livro = await this.service.buscarLivroPorIsbn(isbn);

      res.json(livro);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **POST /livros**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async cadastrarNovoLivro(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const novoLivro: LivroParaCriarDTO = req.body as LivroParaCriarDTO;

      const resultado = await this.service.cadastrarNovoLivro(novoLivro);
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O livro com código ISBN ${novoLivro.isbn} não foi salvo no banco de dados.`
        );

      res.status(201).json(resultado);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **PATCH /livros/:isbn**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async atualizarLivro(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dadosParaAtualizar = req.body as LivroParaAtualizarDTO;
      const { isbn } = req.params;

      const resultado = await this.service.atualizarLivro(
        isbn,
        dadosParaAtualizar
      );
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O livro com código ISBN ${isbn} não foi atualizado no banco de dados.`
        );

      res.json(resultado);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **DELETE /livros/:isbn**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async deletarLivro(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { isbn } = req.params;
      await this.service.deletarLivro(isbn);

      res.sendStatus(200);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }
}

export { LivrosController };
