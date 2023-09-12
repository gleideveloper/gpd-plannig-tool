interface InformacoesApi {
  nome: string;
  versao: string;
  dataVersao: string;
  responsaveis: {
    nome: string;
    email: string;
    github: string;
  }[];
}

export { InformacoesApi };
