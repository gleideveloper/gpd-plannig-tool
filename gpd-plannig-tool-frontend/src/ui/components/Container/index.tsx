import {
  ContainerFlexColunaStyled,
  ContainerFlexLinhaStyled,
} from "./index.style";

import { FC } from "react";

type ContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const ContainerLinha: FC<ContainerProps> = ({ children }): JSX.Element => {
  return <ContainerFlexLinhaStyled>{children}</ContainerFlexLinhaStyled>;
};

const ContainerColuna: FC<ContainerProps> = ({ children }): JSX.Element => {
  return <ContainerFlexColunaStyled>{children}</ContainerFlexColunaStyled>;
};

export { ContainerColuna, ContainerLinha };
