import { Cabecalho } from './ui/components/Cabecalho';
import { Rodape } from './ui/components/Rodape';
import { AlertasProvider } from './ui/contexts/alertas';
import { theme } from './ui/themes';
import { Router } from './routes';

import { ThemeProvider } from '@mui/material';
import { FC } from 'react';

const App: FC = (): JSX.Element => {
  return (
      <ThemeProvider theme={theme} >
        <Cabecalho />
        <AlertasProvider>
          <Router />
        </AlertasProvider>
        <Rodape />
    </ThemeProvider>
  );
};

export { App };
