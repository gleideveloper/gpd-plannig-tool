import { ColaboradoresController } from "../controllers/ColaboradoresController";
import { Router } from "express";

const rotasColaboradores = Router();
const colaboradoresController = new ColaboradoresController();

/************************ Ações executadas para a rota base /operadoras ************************/
rotasColaboradores.get("/:tipo", colaboradoresController.buscarColaboradorPorTipo.bind(colaboradoresController));
rotasColaboradores.get("/", colaboradoresController.buscarTodos.bind(colaboradoresController));
/************************ Ações executadas para a rota base /operadoras ************************/

export { rotasColaboradores };
