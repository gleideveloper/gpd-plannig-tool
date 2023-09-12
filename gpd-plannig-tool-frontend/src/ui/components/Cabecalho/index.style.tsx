import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";

const CabecalhoBarra = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.breakpoints.up("md")} {
    .MuiToolbar-root {
      height: 100%;
    }
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    .MuiToolbar-root {
      display: flex;
      justify-content: center;
    }
  }
`;

const CabecalhoLogo = styled("img")`
  height: 25px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 47px;
  }
`;

export { CabecalhoBarra, CabecalhoLogo };
