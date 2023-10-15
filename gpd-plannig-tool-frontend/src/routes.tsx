import { ListagemDatasRecursosPage } from './pages/ListagemDatasRecursosPage';
import { ListagemProdutosPage } from './pages/ListagemProdutosPage';

import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<ListagemProdutosPage />} />
        <Route path='/pi-forecast' element={<ListagemDatasRecursosPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
