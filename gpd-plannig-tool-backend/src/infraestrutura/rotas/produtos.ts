import { ProdutosController } from "../controllers/ProdutosController";
import { Router } from "express";

const rotasProdutos = Router();
const livrosController = new ProdutosController();

/************************ Ações executadas para a rota base /livros ************************/
rotasProdutos.get("/", livrosController.buscarTodos.bind(livrosController));
rotasProdutos.get(
  "/:id",
  livrosController.buscarProdutoPorId.bind(livrosController)
);
rotasProdutos.post(
  "/",
  livrosController.cadastrarNovoProduto.bind(livrosController)
);
rotasProdutos.patch(
  "/:id",
  livrosController.atualizarProduto.bind(livrosController)
);
rotasProdutos.delete(
  "/:id",
  livrosController.deletarProduto.bind(livrosController)
);
/************************ Ações executadas para a rota base /livros ************************/

export { rotasProdutos };
