import { Dotenv } from "./Dotenv";

Dotenv.carregarVariaveis();

/**
 *
 * Classe utilitária que realiza a formatação de dados.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class Formatador {
  /**
   *
   * Método que formata um objeto de data para o formato
   * **ANO**-**MES**-**DIA** **HORA**:**MINUTO**:**SEGUNDO** GMT **TIMEZONE**.
   *
   * @param data Objeto de data a ser formatado.
   * @returns Data formatada.
   */
  public static formatarData(data: Date): string {
    let ano = data.getFullYear();
    let mes = data.getMonth() < 10 ? `0${data.getMonth()}` : data.getMonth();
    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let hora = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
    let minuto =
      data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
    let segundo =
      data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds();
    let timezone: string | number = data.getTimezoneOffset() / 60;
    let timezoneFormatado =
      timezone < 10 ? `0${Math.abs(timezone)}` : Math.abs(timezone);
    timezoneFormatado =
      timezone > 0 ? `-${timezoneFormatado}` : `+${timezoneFormatado}`;

    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo} GMT${timezoneFormatado}`;
  }
}

export { Formatador };
