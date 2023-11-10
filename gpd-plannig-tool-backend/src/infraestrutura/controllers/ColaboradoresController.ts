import {Dotenv} from "@/common/Dotenv";
import {Logger} from "@/common/Logger";
import {ColaboradorDTOMapper} from "@/dominio/objectmapper/ColaboradoresDTOMapper";
import {ColaboradoresService} from "@/dominio/servicos/ColaboradoresService";
import {SequelizeColaboradoresRepository} from "../repositorios/sequelize/SequelizeColaboradoresRepository";

import {NextFunction, Request, Response} from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/colaboradores**.
 *
 * @author Laura Lima
 */
class ColaboradoresController {
  
  private service: ColaboradoresService;

  private logger: Logger;

  public constructor() {
    this.service = new ColaboradoresService(
      new SequelizeColaboradoresRepository(),
      new ColaboradorDTOMapper()
    );
    this.logger = Logger.pegarInstancia();
  }

  public async buscarTodos(req: Request, res: Response): Promise<void> {
    const colaboradores = await this.service.buscarTodos();
    res.json(colaboradores);
  }

  public async buscarColaboradorPorTipo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { tipo } = req.params;
      const colaboradores = await this.service.buscarColaboradoresPorTipo(tipo);
      res.json(colaboradores);
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
   * rota **GET /colaboradors/:id**.
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   * @param next Referência do middleware de exceções.
   */
  public async buscarColaboradorPorId(
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<void> {
      try {
          const {id} = req.params;
          const colaborador = await this.service.buscarColaboradorPorId(id);

          res.json(colaborador);
      } catch (erro: any) {
          this.logger.error(
              `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
          );
          next(erro);
      }
  }
}

export { ColaboradoresController };
