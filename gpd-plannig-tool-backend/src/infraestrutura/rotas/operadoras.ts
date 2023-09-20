import { OperadorasController } from "../controllers/OperadorasController";
import { Router } from "express";

const rotasOperadoras = Router();
const operadorasController = new OperadorasController();

/************************ Ações executadas para a rota base /operadoras ************************/
rotasOperadoras.get("/", operadorasController.buscarTodos.bind(operadorasController));
rotasOperadoras.get(
  "/:nome",
  operadorasController.buscarOperadoraPorNome.bind(operadorasController)
);
rotasOperadoras.post(
  "/",
  operadorasController.cadastrarNovoOperadora.bind(operadorasController)
);
rotasOperadoras.patch(
  "/:nome",
  operadorasController.atualizarOperadora.bind(operadorasController)
);
rotasOperadoras.delete(
  "/:nome",
  operadorasController.deletarOperadora.bind(operadorasController)
);
/************************ Ações executadas para a rota base /operadoras ************************/

export { rotasOperadoras };
