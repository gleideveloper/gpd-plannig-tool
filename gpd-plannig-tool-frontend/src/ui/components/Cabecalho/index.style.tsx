import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';

const CabecalhoBarra = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.5);
  width: 100vw; /* Defina a largura como 100% da largura da janela de visualização */

  .MuiToolbar-root {
    display: flex;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    .MuiToolbar-root {
      height: 100%;
    }
  }
`;

const CabecalhoLogo = styled('img')`
  height: 25px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 47px;
  }
`;

export { CabecalhoBarra, CabecalhoLogo };
