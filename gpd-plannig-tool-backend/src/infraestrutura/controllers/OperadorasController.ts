import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { OperadoraParaAtualizarDTO } from "@/dominio/dto/OperadoraParaAtualizarDTO";
import { OperadoraParaCriarDTO } from "@/dominio/dto/OperadoraParaCriarDTO";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { OperadoraDTOMapper } from "@/dominio/objectmapper/OperadoraDTOMapper";
import { OperadorasService } from "@/dominio/servicos/OperadorasService";
import { SequelizeOperadorasRepository } from "../repositorios/sequelize/SequelizeOperadorasRepository";

import { NextFunction, Request, Response } from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/operadoras**.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class OperadorasController {
  /**
   *
   * Instância da classe de serviço de
   * operadoras.
   */
  private service: OperadorasService;

  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.service = new OperadorasService(
      new SequelizeOperadorasRepository(),
      new OperadoraDTOMapper()
    );
    this.logger = Logger.pegarInstancia();
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /operadoras**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   */
  public async buscarTodos(req: Request, res: Response): Promise<void> {
    const operadoras = await this.service.buscarTodos();

    res.json(operadoras);
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /operadoras/:nome**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async buscarOperadoraPorNome(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { nome } = req.params;
      const operadora = await this.service.buscarOperadoraPorNome(nome);

      res.json(operadora);
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
   * rota **POST /operadoras**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async cadastrarNovoOperadora(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const novaOperadora: OperadoraParaCriarDTO = req.body as OperadoraParaCriarDTO;

      const resultado = await this.service.cadastrarNovaOperadora(novaOperadora);
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O operadora com nome ${novaOperadora.nome} não foi salva no banco de dados.`
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
   * rota **PATCH /operadoras/:nome**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async atualizarOperadora(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dadosParaAtualizar = req.body as OperadoraParaAtualizarDTO;
      const { nome } = req.params;

      const resultado = await this.service.atualizarOperadora(
        nome,
        dadosParaAtualizar
      );
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O operadora com nome ${nome} não foi atualizada no banco de dados.`
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
   * rota **DELETE /operadoras/:nome**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async deletarOperadora(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { nome } = req.params;
      await this.service.deletarOperadora(nome);

      res.sendStatus(200);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }
}

export { OperadorasController };
