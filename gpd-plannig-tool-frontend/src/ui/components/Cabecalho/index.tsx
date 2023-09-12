import { CabecalhoBarra, CabecalhoLogo } from "./index.style";

import { Container, Link, Toolbar } from "@mui/material";
import { FC } from "react";

const Cabecalho: FC = (): JSX.Element => {
  return (
    <CabecalhoBarra position="sticky">
      <Toolbar component={Container}>
        <Link href="/" underline="none">
          <CabecalhoLogo src="/webacademylogo.png" alt="Web Academy Livros" />
        </Link>
      </Toolbar>
    </CabecalhoBarra>
  );
};

export { Cabecalho };
