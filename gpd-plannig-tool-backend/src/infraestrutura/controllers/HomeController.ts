import { Request, Response } from "express";

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api**.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class HomeController {
  /**
   *
   * Método que responde a ação de chamada para a
   * rota **GET /**.
   *
   * @param req Objeto de requisição.
   * @param res Objeto de resposta.
   */
  public async home(req: Request, res: Response): Promise<void> {
    res.json({
      nome: "gpd-plannig-tool-backend",
      versao: "1.0.0",
      dataVersao: "2023-07-19",
      responsaveis: [
        {
          nome: "Gleides Vinente",
          email: "gleidevelop@gmail.com",
          github: "https://github.com/gleideveloper",
        },
      ],
    });
  }
}

export { HomeController };
