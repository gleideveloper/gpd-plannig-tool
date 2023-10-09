import { ListagemDatasRecursosProvider } from '../ui/contexts/listagem-datas-recursos';

import { Add } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { FC, JSX, useRef } from 'react';

import { ModalRegisterNewProduct, ModalRegisterNewProductProps } from "../ui/components/ModalRegisterNewProduct"; 

const ListagemDatasRecursosPage: FC = (): JSX.Element => {
  const ModalRegisterNewProductRef = useRef<ModalRegisterNewProductProps>(null);
  const tituloPagina = 'Dates and Resources Table';

  const tituloPaginaStyle = {
    marginTop: 2,
    fontSize: '40px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    fontWeight: '500',
    letterSpacing: '2.25px',
    color: '#00305C',
  };
  const btnRegisterProductStyle = {
    backgroundColor: '#E45344',
    color: '#F8F5EF',
    height: 40,
  };

  return (
    <>
    <ModalRegisterNewProduct ref={ModalRegisterNewProductRef} />
      <Container
        sx={{
          marginY: 7,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <Typography component='h5' variant='h3' style={tituloPaginaStyle}>
            {tituloPagina}
          </Typography>
          <Button
            style={btnRegisterProductStyle}
            variant='contained'
            onClick={() => { ModalRegisterNewProductRef.current.abrirModal(); }}
          >
            <Add color='secondary' sx={{ mr: 1 }} /> {' Register a New Product'}
          </Button>
        </div>
        <ListagemDatasRecursosProvider />
      </Container>
    </>
  );
};

export { ListagemDatasRecursosPage };
