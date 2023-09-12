import { ListagemLivrosProvider } from "../ui/contexts/listagem-livros";

import { Add } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { FC, JSX } from "react";
import { useNavigate } from "react-router-dom";

const ListagemLivrosPage: FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container sx={{ marginY: 2 }}>
      <Button variant="contained" onClick={() => navigate("/adicionar-livro")}>
        <Add color="secondary" /> {" Adicionar Novo Livro"}
      </Button>

      <ListagemLivrosProvider />
    </Container>
  );
};

export { ListagemLivrosPage };
