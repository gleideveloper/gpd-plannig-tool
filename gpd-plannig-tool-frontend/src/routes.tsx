import { ListagemDatasRecursosPage } from './pages/ListagemDatasRecursosPage';
import { ListagemProdutosPage } from './pages/ListagemProdutosPage';

import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cabecalho } from './ui/components/Cabecalho';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Cabecalho />
      <Routes>
        <Route path='/product-detail' element={<ListagemProdutosPage />} />
        <Route path='/' element={<ListagemDatasRecursosPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
