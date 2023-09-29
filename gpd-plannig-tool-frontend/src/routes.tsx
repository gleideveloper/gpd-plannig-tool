import { FormularioLivroPage } from "./pages/FormularioLivroPage";
import { ListagemDatasRecursosPage } from "./pages/ListagemDatasRecursosPage";
import { ListagemProdutosPage } from "./pages/ListagemProdutosPage";
import { VisualizacaoLivroPage } from "./pages/VisualizacaoLivroPage";

import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<ListagemProdutosPage />} />
        <Route path="/dates-and-resources" element={<ListagemDatasRecursosPage />} />
        <Route
          path="/editar-livro/:isbnLivroSelecionado"
          element={<FormularioLivroPage />}
        />
        <Route
          path="/visualizar/:isbnLivroSelecionado"
          element={<VisualizacaoLivroPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
