import { ProdutosController } from "../controllers/ProdutosController";
import { Router } from "express";

const rotasProdutos = Router();
const livrosController = new ProdutosController();

/************************ Ações executadas para a rota base /livros ************************/
rotasProdutos.get("/", livrosController.buscarTodos.bind(livrosController));
rotasProdutos.get(
  "/:isbn",
  livrosController.buscarProdutoPorId.bind(livrosController)
);
rotasProdutos.post(
  "/",
  livrosController.cadastrarNovoProduto.bind(livrosController)
);
rotasProdutos.patch(
  "/:isbn",
  livrosController.atualizarProduto.bind(livrosController)
);
rotasProdutos.delete(
  "/:isbn",
  livrosController.deletarProduto.bind(livrosController)
);
/************************ Ações executadas para a rota base /livros ************************/

export { rotasProdutos };
