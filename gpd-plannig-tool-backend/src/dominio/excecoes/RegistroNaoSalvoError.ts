import { ErroBase } from "./ErroBase";

/**
 *
 * Classe de exceção que define a falha de
 * um registro não salvo na base de dados
 * da aplicação por um erro interno.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class RegistroNaoSalvoError extends ErroBase {
  public constructor(
    mensagem: string = "Registro não salvo na base de dados."
  ) {
    super("RESTRICAO", mensagem, null);
  }
}

export { RegistroNaoSalvoError };
