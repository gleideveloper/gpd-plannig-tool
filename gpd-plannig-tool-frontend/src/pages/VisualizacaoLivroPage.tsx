import { ErroApiDTO } from "../data/dto/ErroApiDTO";
import { LivroDTO } from "../data/dto/LivroDTO";
import { ApiService } from "../data/services/ApiService";
import { adicionarMascaraIsbn } from "../data/utils";
import { ContainerColuna } from "../ui/components/Container";
import { AlertasContext } from "../ui/contexts/alertas";

import { Edit } from "@mui/icons-material";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { FC, JSX, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VisualizacaoLivroPage: FC = (): JSX.Element => {
  const [livroSelecionado, setLivroSelecionado] = useState<LivroDTO>(null);
  const { adicionarAlerta } = useContext(AlertasContext);
  const { isbnLivroSelecionado } = useParams();
  const navigate = useNavigate();

  const buscarLivroSelecionado = async () => {
    try {
      const resposta = await ApiService.get<LivroDTO>(
        `${import.meta.env.VITE_ROTA_LIVROS}/${isbnLivroSelecionado}`
      );
      setLivroSelecionado(resposta.data as LivroDTO);
    } catch (e: any) {
      const erro = e as AxiosError;
      adicionarAlerta({
        textoAlerta: `Falha ao buscar dados do livro: ${
          (erro.response.data as ErroApiDTO).mensagem
        }`,
        tipoAlerta: "error",
      });
      navigate("/");
    }
  };
  const onEditar = () => {
    navigate(`/editar-livro/${livroSelecionado.isbn}`);
  };

  useEffect(() => {
    buscarLivroSelecionado();
  }, []);

  return (
    <Box
      sx={{
        my: 2,
      }}
    >
      {livroSelecionado && (
        <Box>
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "90%",
                }}
                src={livroSelecionado.urlImagem}
                alt={livroSelecionado.nome}
              />
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ mt: 0.5 }}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  {livroSelecionado.nome}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  Código ISBN
                </Typography>
                <Typography
                  sx={{ textAlign: "justify", mt: 1 }}
                  variant="body1"
                  component="p"
                >
                  {adicionarMascaraIsbn(livroSelecionado.isbn)}
                </Typography>
              </Box>

              <Box sx={{ mt: 1, mb: 4 }}>
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  Autores
                </Typography>
                <List>
                  {livroSelecionado.autores.map((autor, i) => (
                    <ListItem key={i}>{autor}</ListItem>
                  ))}
                </List>
              </Box>

              <ContainerColuna>
                <Button variant="contained" color="info" onClick={onEditar}>
                  <Edit /> {" Editar"}
                </Button>
              </ContainerColuna>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography component="h3" variant="h5" sx={{ fontWeight: "bold" }}>
              Sinopse
            </Typography>
            <Typography
              sx={{ textAlign: "justify", mt: 1 }}
              variant="body1"
              component="p"
            >
              {livroSelecionado.sinopse}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export { VisualizacaoLivroPage };
