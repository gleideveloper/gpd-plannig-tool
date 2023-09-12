import { TipoErroApiEnum } from "./TipoErroApiEnum";

interface ErroApiDTO {
  status: number;
  mensagem: string;
  tipo: TipoErroApiEnum;
  extras?: object;
}

export { ErroApiDTO };
