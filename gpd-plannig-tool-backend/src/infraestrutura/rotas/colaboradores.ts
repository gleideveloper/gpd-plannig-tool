import {ColaboradoresController} from "../controllers/ColaboradoresController";
import {Router} from "express";

const rotasColaboradores = Router();
const colaboradoresController = new ColaboradoresController();

/************************ Ações executadas para a rota base /colaborador ************************/

rotasColaboradores.get("/id/:id", colaboradoresController.buscarColaboradorPorId.bind(colaboradoresController));
rotasColaboradores.get("/tipo/:tipo", colaboradoresController.buscarColaboradorPorTipo.bind(colaboradoresController));
rotasColaboradores.get("/", colaboradoresController.buscarTodos.bind(colaboradoresController));

export { rotasColaboradores };
