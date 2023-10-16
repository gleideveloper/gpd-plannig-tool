import {ListagemDatasRecursosPage} from './pages/ListagemDatasRecursosPage';
import {ListagemProdutosPage} from './pages/ListagemProdutosPage';

import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from "@mui/material";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/pi-forecasting' element={<ListagemDatasRecursosPage />} />
        <Route path='/product-detail' element={<ListagemProdutosPage />} />
        <Route path='/' index element={< Container/>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
