import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ContainerFlexColunaStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ContainerFlexLinhaStyled = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(0.75)};
`;

export { ContainerFlexColunaStyled, ContainerFlexLinhaStyled };
