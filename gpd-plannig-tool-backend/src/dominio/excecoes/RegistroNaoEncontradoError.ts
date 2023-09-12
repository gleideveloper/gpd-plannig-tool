import { ErroBase } from "./ErroBase";

/**
 *
 * Classe de exceção que define a falha de
 * um registro não encontrado na base de
 * dados da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class RegistroNaoEncontradoError extends ErroBase {
  public constructor(mensagem: string = "Registro não encontrado.") {
    super("NAO_ENCONTRADO", mensagem, null);
  }
}

export { RegistroNaoEncontradoError };
