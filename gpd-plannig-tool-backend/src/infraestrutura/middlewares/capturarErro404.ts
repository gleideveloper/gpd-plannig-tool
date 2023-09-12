import { NextFunction, Request, Response } from "express";

/**
 *
 * Função middleware que captura erros HTTP **404 - Not Found**
 * na aplicação.
 *
 * @param req Objeto de requisição.
 * @param res Objeto de resposta.
 * @param next Próximo middleware do encadeamento.
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
const capturarErro404 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(404);
  res.send(`A rota ${req.url} não existe no servidor.`);
};

export { capturarErro404 };
