import { ErroBase } from "./ErroBase";

/**
 *
 * Classe de exceção que define a falha de
 * uma tentativa de cadastrar um tipo
 * de um template que já existe na base
 * de dados da aplicação.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class TipoUnicoError extends ErroBase {
  public constructor(mensagem: string = "Tipo de template repetido.") {
    super("RESTRICAO", mensagem, null);
  }
}

export { TipoUnicoError };
