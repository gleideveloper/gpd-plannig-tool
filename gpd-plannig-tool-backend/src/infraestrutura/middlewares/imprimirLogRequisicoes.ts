import { Logger } from "@/common/Logger";

import { NextFunction, Request, Response } from "express";

/**
 *
 * Função de middleware que escreve em log as
 * informações referentes à requisição executada,
 * escrevendo método HTTP executado, rota da
 * aplicação chamada, código de status HTTP da
 * resposta e tempo decorrido para atendimento
 * da requisição.
 *
 * @param req Objeto de requisição.
 * @param res Objeto de resposta.
 * @param next Próximo middleware do encadeamento.
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
const imprimirLogRequisicoes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const logger = Logger.pegarInstancia();
  const inicio = Date.now();

  res.on("finish", () => {
    const { method, originalUrl } = req;
    const { statusCode } = res;
    const fim = Date.now();
    const mensagem = `${method} ${originalUrl} ${statusCode} ${
      fim - inicio
    }ms.`;

    if (statusCode >= 100 && statusCode <= 299) logger.info(mensagem);
    else if (statusCode >= 300 && statusCode <= 399) logger.info(mensagem);
    else if (statusCode >= 400 && statusCode <= 599) logger.error(mensagem);
  });

  next();
};

export { imprimirLogRequisicoes };
