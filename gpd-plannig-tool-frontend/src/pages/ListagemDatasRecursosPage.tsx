import { ListagemDatasRecursosProvider } from '../ui/contexts/listagem-datas-recursosTESTE';

import { Container, Typography } from '@mui/material';
import { FC, JSX } from 'react';

const ListagemDatasRecursosPage: FC = (): JSX.Element => {
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

  return (
    <>
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
        </div>
        <ListagemDatasRecursosProvider />
      </Container>
    </>
  );
};

export { ListagemDatasRecursosPage };
