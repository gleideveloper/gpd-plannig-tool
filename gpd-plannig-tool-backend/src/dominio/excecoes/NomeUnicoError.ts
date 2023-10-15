import { ErroBase } from "./ErroBase";

/**
 *
 * Classe de exceção que define a falha de
 * uma tentativa de cadastrar um nome
 * de uma operadora que já existe na base
 * de dados da aplicação.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class NomeUnicoError extends ErroBase {
  public constructor(mensagem: string = "Nome repetido.") {
    super("RESTRICAO", mensagem, null);
  }
}

export { NomeUnicoError };
