/**
 *
 * Classe abstrata que representa um
 * erro ocorrido dentro da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
abstract class ErroBase extends Error {
  /**
   *
   * Tipo do erro ocorrido.
   */
  private readonly _tipo: string;

  /**
   *
   * Mensagem do erro.
   */
  private readonly _mensagem: string;

  /**
   *
   * Informações extras sobre o erro.
   */
  private readonly _extras: any;

  public constructor(tipo: string, mensagem: string, extras: any) {
    super(mensagem);

    this._tipo = tipo;
    this._mensagem = mensagem;
    this._extras = extras;
  }

  /**
   *
   * Método que retorna o tipo do erro
   * ocorrido.
   *
   * @returns Tipo do erro.
   */
  public get tipo(): string {
    return this._tipo;
  }

  /**
   *
   * Método que retorna a mensagem do
   * erro ocorrido.
   *
   * @returns Mensagem do erro.
   */
  public get mensagem(): string {
    return this._mensagem;
  }

  /**
   *
   * Método que retorna as informações
   * extras do erro ocorrido.
   *
   * @returns Informações extras do erro.
   */
  public get extras(): any {
    return this._extras;
  }
}

export { ErroBase };
