import { ListagemLivrosProvider } from "../ui/contexts/listagem-livros";

import { Add } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { FC, JSX, useRef } from "react";

import { ModalRegisterNewProduct, ModalRegisterNewProductProps } from "../ui/components/ModalRegisterNewProduct"; 

const ListagemLivrosPage: FC = (): JSX.Element => {
  const ModalRegisterNewProductRef = useRef<ModalRegisterNewProductProps>(null);

  return (
    <>
    <ModalRegisterNewProduct ref={ModalRegisterNewProductRef} />
    <Container sx={{ marginY: 2 }}>
      <Button variant="contained" onClick={() => { ModalRegisterNewProductRef.current.abrirModal(); }}>
      <Add color="secondary" /> {" Novo Produto"}
      </Button>

      <ListagemLivrosProvider />
    </Container>
    </>
    
  );
};

export { ListagemLivrosPage };
