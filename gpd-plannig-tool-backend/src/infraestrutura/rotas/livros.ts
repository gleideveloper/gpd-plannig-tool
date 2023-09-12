import { LivrosController } from "../controllers/LivrosController";
import { Router } from "express";

const rotasLivros = Router();
const livrosController = new LivrosController();

/************************ Ações executadas para a rota base /livros ************************/
rotasLivros.get("/", livrosController.buscarTodos.bind(livrosController));
rotasLivros.get(
  "/:isbn",
  livrosController.buscarLivroPorIsbn.bind(livrosController)
);
rotasLivros.post(
  "/",
  livrosController.cadastrarNovoLivro.bind(livrosController)
);
rotasLivros.patch(
  "/:isbn",
  livrosController.atualizarLivro.bind(livrosController)
);
rotasLivros.delete(
  "/:isbn",
  livrosController.deletarLivro.bind(livrosController)
);
/************************ Ações executadas para a rota base /livros ************************/

export { rotasLivros };
