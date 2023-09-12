import { InformacoesApi } from "../dto/InformacoesApi";
import { ApiService } from "../services/ApiService";

import { useState } from "react";

const useInfosApi = () => {
  const [infosApi, setInfosApi] = useState<InformacoesApi>();

  const buscarInfosApi = async () => {
    try {
      const { VITE_ROTA_INFOS_API } = import.meta.env;
      const { data } = await ApiService.get<InformacoesApi>(
        VITE_ROTA_INFOS_API as string
      );

      setInfosApi(data);
    } catch (erro: any) {
      console.log(erro);
    }
  };
  void buscarInfosApi();

  return { infosApi };
};

export { useInfosApi };
