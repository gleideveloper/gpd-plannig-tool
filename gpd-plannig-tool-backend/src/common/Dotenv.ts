import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 *
 * Classe de carregamento de configurações da
 * aplicação em variáveis de ambiente.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class Dotenv {
  /**
   *
   * Método que carrega as configurações da aplicação
   * em variáveis de ambiente a partir de um arquivo.
   *
   * @param nome Nome do arquivo de configuração. Por padrão, é buscado por um arquivo chamado **.env**.
   */
  public static carregarVariaveis(nome: string = ".env"): void {
    const caminho = join(process.cwd(), nome);

    if (!existsSync(caminho))
      throw new Error(
        "O projeto deve ter um arquivo de configuracoes com o nome especificado ou com o nome '.env'."
      );

    const conteudo: string[] = readFileSync(caminho, {
      encoding: "utf8",
      flag: "r",
    }).split("\n");

    for (let linha of conteudo) {
      linha = linha.trim();

      if (linha && !linha.startsWith("#")) {
        let [chave, valor] = linha.split("=");
        valor = valor.replace('"', "");
        valor = valor.replace('"', "");

        process.env[chave] = valor;
      }
    }
  }
}

export { Dotenv };
