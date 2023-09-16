import React, { FC, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

// Estilo para aplicar a cor #00305C à barra do menu antes de clicar no ícone do hamburger
const menuBarStyle = { backgroundColor: '#00305C' };

// Estilo para aplicar a cor #E45344 ao ícone do hamburger
const hamburgerIconStyle = { color: '#E45344' };

// Estilo para aplicar a cor branca ao texto do item da lista
const listItemTextStyle = { color: 'white' };

const CabecalhoBarra = styled(AppBar)`
  background-color: transparent; /* Fundo transparente */
  box-shadow: none; /* Sem sombra */
  width: 100vw; /* Defina a largura como 100% da largura da janela de visualização */

  .MuiToolbar-root {
    display: flex;
    justify-content: space-between; /* Alinhar ícone do hamburger à esquerda e logo/texto à direita */
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

const DrawerBackground = styled(Drawer)`
  .MuiPaper-root {
    background-color: #00305C; /* Cor de fundo do Drawer */
  }

  .MuiListItemText-primary {
    font-weight: normal; /* Padrão de font-weight */
  }

  .MuiListItem-button:hover .MuiSvgIcon-root,
  .MuiListItem-button:hover .MuiListItemText-primary {
    color: white; /* Altera a cor do ícone e do texto no hover */
    font-weight: bold; /* Texto em negrito no hover */
  }
`;

const Cabecalho: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CabecalhoBarra position="sticky" sx={menuBarStyle}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} sx={hamburgerIconStyle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GPD planning tool
          </Typography>
        </Toolbar>
      </CabecalhoBarra>
      <DrawerBackground anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon sx={hamburgerIconStyle} />
            </ListItemIcon>
            <ListItemText primary="Home" sx={listItemTextStyle} />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <CalendarMonthIcon sx={hamburgerIconStyle} />
            </ListItemIcon>
            <ListItemText primary="Agenda" sx={listItemTextStyle} />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <PhonelinkSetupIcon sx={hamburgerIconStyle} />
            </ListItemIcon>
            <ListItemText primary="Produtos" sx={listItemTextStyle} />
          </ListItem>

        </List>
      </DrawerBackground>
    </>
  );
};

export { Cabecalho, CabecalhoLogo };
