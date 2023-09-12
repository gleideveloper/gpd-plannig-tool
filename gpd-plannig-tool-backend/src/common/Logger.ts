import { Dotenv } from "./Dotenv";
import { Formatador } from "./Formatador";

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { format } from "node:util";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de log da aplicação.
 *
 * @author Linnik Maciel <lms2@icomp.ufam.edu.br>
 */
class Logger {
  /**
   *
   * Instância de log da aplicação,
   * implementando o padrão de projetos
   * Singleton.
   */
  private static instancia: Logger | null = null;
  /**
   *
   * Diretório base dos arquivos de
   * log da aplicação.
   */
  private diretorioLog: string;
  /**
   *
   * Bandeira que indica se as
   * mensagens de log da aplicação
   * devem ser escritas em arquivo
   * ou não.
   */
  private deveEscreverEmArquivo: boolean;

  /**
   *
   * Construtor privado, implementando
   * o padrão de projetos Singleton.
   */
  private constructor() {
    this.diretorioLog = join(process.cwd(), "/log");
    this.deveEscreverEmArquivo = JSON.parse(
      process.env.ESCREVER_LOG_ARQUIVO as string
    ) as boolean;

    if (this.deveEscreverEmArquivo) {
      if (!existsSync(this.diretorioLog)) mkdirSync(this.diretorioLog);
    }
  }

  /**
   *
   * Método que retorna a instância de log
   * da aplicação, implementando o padrão
   * de projetos Singleton.
   *
   * @returns Instância de log da aplicação.
   */
  public static pegarInstancia(): Logger {
    if (Logger.instancia === null) Logger.instancia = new Logger();

    return Logger.instancia;
  }

  /**
   *
   * Método que imprime uma mensagem de
   * informação no log da aplicação.
   *
   * @param mensagem Mensagem a ser impressa.
   */
  public info(mensagem: string): void {
    const mensagemLog = `[INFO] ${this.prepararMensagemLog(mensagem)}`;

    if (this.deveEscreverEmArquivo)
      this.escreverLogEmArquivo("infos.log", `${mensagemLog}\n`);

    process.stdout.write(
      format.apply(this, [`\x1b[92m${mensagemLog}\x1b[0m\n`])
    );
  }

  /**
   *
   * Método que imprime uma mensagem de
   * alerta no log da aplicação.
   *
   * @param mensagem Mensagem a ser impressa.
   */
  public warning(mensagem: string): void {
    const mensagemLog = `[WARN] ${this.prepararMensagemLog(mensagem)}`;

    if (this.deveEscreverEmArquivo)
      this.escreverLogEmArquivo("warnings.log", `${mensagemLog}\n`);

    process.stdout.write(
      format.apply(this, [`\x1b[93m${mensagemLog}\x1b[0m\n`])
    );
  }

  /**
   *
   * Método que imprime uma mensagem de
   * erro no log da aplicação.
   *
   * @param mensagem Mensagem a ser impressa.
   */
  public error(mensagem: string): void {
    const mensagemLog = `[ERROR] ${this.prepararMensagemLog(mensagem)}`;

    if (this.deveEscreverEmArquivo)
      this.escreverLogEmArquivo("errors.log", `${mensagemLog}\n`);

    process.stdout.write(
      format.apply(this, [`\x1b[91m${mensagemLog}\x1b[0m\n`])
    );
  }

  /**
   *
   * Método que prepara a mensagem a ser
   * impressa no log da aplicação.
   *
   * @param mensagem Mensagem a ser preparada.
   * @returns Mensagem preparada.
   */
  private prepararMensagemLog(mensagem: string): string {
    const dataLog: string = Formatador.formatarData(new Date());

    return `${dataLog}: ${mensagem}`;
  }

  /**
   *
   * Método que escreve uma mensagem de log
   * em um arquivo de log da aplicação.
   *
   * @param nomeArquivo Nome do arquivo de log da aplicação.
   * @param mensagemLog Mensagem de log da aplicação.
   */
  private escreverLogEmArquivo(nomeArquivo: string, mensagemLog: string): void {
    writeFileSync(join(this.diretorioLog, nomeArquivo), mensagemLog, {
      flag: "a+",
    });
  }
}

export { Logger };
