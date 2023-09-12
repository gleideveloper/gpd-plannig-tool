import { ErroBase } from "@/dominio/excecoes/ErroBase";
import { ISBNUnicoError } from "@/dominio/excecoes/ISBNUnicoError";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ValidacaoError } from "@/dominio/excecoes/ValidacaoError";

import { NextFunction, Request, Response } from "express";

/**
 *
 * Função de middleware que captura exceções ocorridas na
 * aplicação e trata as saídas em respostas para a requisição
 * vigente no formato JSON.
 *
 * @param erro Exceção capturada.
 * @param req Objeto de requisição.
 * @param res Objeto de resposta.
 * @param next Próximo middleware do encadeamento.
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
const capturarExcecoes = async (
  erro: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let status = 500;
  let mensagem = erro.message;
  let tipo = "INTERNO";
  let extras = null;

  if (erro instanceof ErroBase) {
    tipo = erro.tipo;
    extras = erro.extras;
  }

  if (erro instanceof RegistroNaoEncontradoError) {
    status = 404;
  } else if (
    erro instanceof RegistroNaoSalvoError ||
    erro instanceof ValidacaoError ||
    erro instanceof ISBNUnicoError
  ) {
    status = 422;
  } else {
    status = 500;
  }

  res.status(status).json({ status, tipo, mensagem, extras });
};

export { capturarExcecoes };
