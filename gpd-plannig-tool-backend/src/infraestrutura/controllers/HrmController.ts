import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { HrmParaAtualizarDTO } from "@/dominio/dto/HrmParaAtualizarDTO";
import { HrmParaCriarDTO } from "@/dominio/dto/HrmParaCriarDTO";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { HrmDTOMapper } from "@/dominio/objectmapper/HrmDTOMapper";
import { HrmsService } from "@/dominio/servicos/HrmsService";
import { SequelizeHrmsRepository } from "../repositorios/sequelize/SequelizeHrmsRepository";

import { NextFunction, Request, Response } from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/hrms**.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class HrmsController {
  /**
   *
   * Instância da classe de serviço de
   * hrms.
   */
  private service: HrmsService;

  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.service = new HrmsService(
      new SequelizeHrmsRepository(),
      new HrmDTOMapper()
    );
    this.logger = Logger.pegarInstancia();
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /hrms**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   */
  public async buscarTodos(req: Request, res: Response): Promise<void> {
    const hrms = await this.service.buscarTodos();

    res.json(hrms);
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /hrms/:id**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async buscarHrmPorId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const hrm = await this.service.buscarHrmPorId(id);

      res.json(hrm);
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
   * rota **POST /hrms**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async cadastrarNovoHrm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const novoHrm: HrmParaCriarDTO = req.body as HrmParaCriarDTO;

      const resultado = await this.service.cadastrarNovoHrm(novoHrm);
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O hrm com id ${novoHrm.id} não foi salvo no banco de dados.`
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
   * rota **PATCH /hrms/:id**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async atualizarHrm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dadosParaAtualizar = req.body as HrmParaAtualizarDTO;
      const { id } = req.params;

      const resultado = await this.service.atualizarHrm(
        id,
        dadosParaAtualizar
      );
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O hrm com id ${id} não foi atualizado no banco de dados.`
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
   * rota **DELETE /hrms/:id**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async deletarHrm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.deletarHrm(id);

      res.sendStatus(200);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }
}

export { HrmsController };
