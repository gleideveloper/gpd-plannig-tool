import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const RodapeStyled = styled("footer")`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => theme.spacing(4)} 0;
  margin-top: auto;
`;

const RodapeContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;

  ${({ theme }) => theme.breakpoints.down("md")} {
    gap: ${({ theme }) => theme.spacing(5)};
  }
`;

const RodapeLista = styled("ul")`
  display: flex;
  gap: ${({ theme }) => theme.spacing()};
  list-style-type: none;
  padding: 0;
`;

const RodapeItemLista = styled("li")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export { RodapeContainer, RodapeItemLista, RodapeLista, RodapeStyled };
