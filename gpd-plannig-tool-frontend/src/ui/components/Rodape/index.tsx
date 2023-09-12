import { InformacoesApi } from "../../../data/dto/InformacoesApi";
import { ApiService } from "../../../data/services/ApiService";
import {
  RodapeContainer,
  RodapeItemLista,
  RodapeLista,
  RodapeStyled,
} from "./index.style";

import { Email, GitHub } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

const Rodape: FC = (): JSX.Element => {
  const [infosApi, setInfosApi] = useState<InformacoesApi>();

  useEffect(() => {
    const buscarInfosApi = async () => {
      try {
        const { data } = await ApiService.get<InformacoesApi>(
          import.meta.env.VITE_ROTA_INFOS_API
        );
        setInfosApi(data);
      } catch (erro: any) {
        console.log(erro);
      }
    };

    void buscarInfosApi();
  }, []);

  return (
    <RodapeStyled>
      <RodapeContainer>
        <Box sx={{ maxWidth: "400px" }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Esta aplicação foi construída como exemplo para o módulo de Docker
            do curso Web Academy da UFAM.
          </Typography>
          {infosApi && (
            <Typography
              variant="body2"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              {`Versão ${infosApi.versao}`}
            </Typography>
          )}
        </Box>
        <Box sx={{ maxWidth: "400px" }}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {`Copyright © ${new Date().getFullYear()}`}
          </Typography>

          <Typography
            variant="body2"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Responsáveis pela aplicação
          </Typography>
          <RodapeLista>
            {infosApi &&
              infosApi.responsaveis.map((resp) => (
                <RodapeItemLista key={resp.email}>
                  {resp.nome}
                  <a href={`mailto:${resp.email}`}>
                    <Email color="secondary" />
                  </a>
                  <a href={resp.github} target="_blank">
                    <GitHub color="secondary" />
                  </a>
                </RodapeItemLista>
              ))}
          </RodapeLista>
        </Box>
      </RodapeContainer>
    </RodapeStyled>
  );
};

export { Rodape };
