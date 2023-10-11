import { ProdutosController } from "../controllers/ProdutosController";
import { Router } from "express";

const rotasProdutos = Router();
const produtosController = new ProdutosController();

/************************ Ações executadas para a rota base /livros ************************/
rotasProdutos.get("/", produtosController.buscarTodos.bind(produtosController));
rotasProdutos.get(
  "/:id",
  produtosController.buscarProdutoPorId.bind(produtosController)
);
rotasProdutos.post(
  "/",
  produtosController.cadastrarNovoProduto.bind(produtosController)
);
rotasProdutos.patch(
  "/:id",
  produtosController.atualizarProduto.bind(produtosController)
);
rotasProdutos.delete(
  "/:id",
  produtosController.deletarProduto.bind(produtosController)
);
/************************ Ações executadas para a rota base /livros ************************/

export { rotasProdutos };
