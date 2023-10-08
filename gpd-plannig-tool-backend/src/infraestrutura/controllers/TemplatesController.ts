import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { TemplateParaAtualizarDTO } from "@/dominio/dto/TemplateParaAtualizarDTO";
import { TemplateParaCriarDTO } from "@/dominio/dto/TemplateParaCriarDTO";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { TemplateDTOMapper } from "@/dominio/objectmapper/TemplateDTOMapper";
import { TemplatesService } from "@/dominio/servicos/TemplatesService";
import { SequelizeTemplatesRepository } from "../repositorios/sequelize/SequelizeTemplatesRepository";

import { NextFunction, Request, Response } from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/templates**.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class TemplatesController {
  /**
   *
   * Instância da classe de serviço de
   * templates.
   */
  private service: TemplatesService;

  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.service = new TemplatesService(
      new SequelizeTemplatesRepository(),
      new TemplateDTOMapper()
    );
    this.logger = Logger.pegarInstancia();
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /templates**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   */
  public async buscarTodos(req: Request, res: Response): Promise<void> {
    const templates = await this.service.buscarTodos();

    res.json(templates);
  }

  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /templates/:tipo**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async buscarTemplatePorTipo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { tipo } = req.params;
      const template = await this.service.buscarTemplatePorTipo(tipo);

      res.json(template);
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
   * rota **POST /templates**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async cadastrarNovoTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const novoTemplate: TemplateParaCriarDTO = req.body as TemplateParaCriarDTO;

      const resultado = await this.service.cadastrarNovoTemplate(novoTemplate);
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O template com tipo ${novoTemplate.tipo} não foi salvo no banco de dados.`
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
   * rota **PATCH /templates/:tipo**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async atualizarTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dadosParaAtualizar = req.body as TemplateParaAtualizarDTO;
      const { tipo } = req.params;

      const resultado = await this.service.atualizarTemplate(
        tipo,
        dadosParaAtualizar
      );
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O template com tipo ${tipo} não foi atualizado no banco de dados.`
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
   * rota **DELETE /templates/:tipo**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async deletarTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { isbn } = req.params;
      await this.service.deletarTemplate(isbn);

      res.sendStatus(200);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }
}

export { TemplatesController };
