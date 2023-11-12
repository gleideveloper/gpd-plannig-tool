import {InformacoesApi} from "../../../data/dto/InformacoesApi";
import {ApiService} from "../../../data/services/ApiService";
import {RodapeContainer, RodapeStyled,} from "./index.style";
import {Box, Typography} from "@mui/material";
import {FC, useEffect, useState} from "react";

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
    <RodapeStyled sx={{ position: "absolute", bottom: "0", width: "100%", padding: "20px 0px"}}>
      <RodapeContainer>
        <Box>
          {infosApi && (
            <Typography
              variant="body2"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              {`Version ${infosApi.versao}`}
            </Typography>
          )}
        </Box>
        <Box sx={{ maxWidth: "400px" }}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {`Copyright © ${new Date().getFullYear()}`}
          </Typography>
        </Box>
      </RodapeContainer>
    </RodapeStyled>
  );
};

export { Rodape };
