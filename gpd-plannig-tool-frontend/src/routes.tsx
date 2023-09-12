import { FormularioLivroPage } from "./pages/FormularioLivroPage";
import { ListagemLivrosPage } from "./pages/ListagemLivrosPage";
import { VisualizacaoLivroPage } from "./pages/VisualizacaoLivroPage";

import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<ListagemLivrosPage />} />
        <Route path="/adicionar-livro" element={<FormularioLivroPage />} />
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
