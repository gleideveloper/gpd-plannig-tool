import { Cabecalho } from "./ui/components/Cabecalho";
import { Rodape } from "./ui/components/Rodape";
import { AlertasProvider } from "./ui/contexts/alertas";
import { AppContainer } from "./ui/styles/pages/LivrosPage.style";
import { theme } from "./ui/themes";
import { Router } from "./routes";

import { ThemeProvider } from "@mui/material";
import { FC } from "react";

const App: FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Cabecalho />
        <AlertasProvider>
          <Router />
        </AlertasProvider>
        <Rodape />
      </AppContainer>
    </ThemeProvider>
  );
};

export { App };
