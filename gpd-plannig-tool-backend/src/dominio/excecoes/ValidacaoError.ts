import { ErroBase } from "./ErroBase";

/**
 *
 * Classe de exceção que define a falha de
 * erros de validação em campos enviados
 * para inserir/atualizar na base de dados
 * da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class ValidacaoError extends ErroBase {
  public constructor(mensagem: string, extras: object) {
    super("VALIDACAO", mensagem, extras);
  }
}

export { ValidacaoError };
