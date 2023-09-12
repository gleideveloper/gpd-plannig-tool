import { ErroBase } from "./ErroBase";

/**
 *
 * Classe de exceção que define a falha de
 * uma tentativa de cadastrar um código
 * ISBN de um livro que já existe na base
 * de dados da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class ISBNUnicoError extends ErroBase {
  public constructor(mensagem: string = "ISBN repetido.") {
    super("RESTRICAO", mensagem, null);
  }
}

export { ISBNUnicoError };
