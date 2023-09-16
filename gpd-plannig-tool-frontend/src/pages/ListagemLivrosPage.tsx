import { ListagemLivrosProvider } from '../ui/contexts/listagem-livros';

import { Add } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { FC, JSX } from 'react';
import { useNavigate } from 'react-router-dom';

const ListagemLivrosPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const tituloPagina = 'Product Table';

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
          onClick={() => navigate('/adicionar-livro')}
        >
          <Add color='secondary' sx={{ mr: 1 }} /> {' Register a New Product'}
        </Button>
      </div>
      <ListagemLivrosProvider />
    </Container>
  );
};

export { ListagemLivrosPage };
