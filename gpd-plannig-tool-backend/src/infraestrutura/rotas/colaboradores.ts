import {ColaboradoresController} from "../controllers/ColaboradoresController";
import {Router} from "express";

const rotasColaboradores = Router();
const colaboradoresController = new ColaboradoresController();

/************************ Ações executadas para a rota base /colaborador ************************/
rotasColaboradores.get("/:tipo", colaboradoresController.buscarColaboradorPorTipo.bind(colaboradoresController));
rotasColaboradores.get("/", colaboradoresController.buscarTodos.bind(colaboradoresController));
rotasColaboradores.get("/:id", colaboradoresController.buscarColaboradorPorId.bind(colaboradoresController));

export { rotasColaboradores };
