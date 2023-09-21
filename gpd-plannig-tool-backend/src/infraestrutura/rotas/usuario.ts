import { UsuariosController } from "../controllers/UsuarioController";
import { Router } from "express";

const rotasUsuarios = Router();
const usuariosController = new UsuariosController();

/************************ Ações executadas para a rota base /usuarios ************************/
rotasUsuarios.get("/", usuariosController.buscarTodos.bind(usuariosController));
rotasUsuarios.get("/:id", usuariosController.buscarUsuarioPorId.bind(usuariosController));
rotasUsuarios.post("/", usuariosController.cadastrarNovoUsuario.bind(usuariosController));
rotasUsuarios.patch("/:id", usuariosController.atualizarUsuario.bind(usuariosController));
rotasUsuarios.delete("/:id", usuariosController.deletarUsuario.bind(usuariosController));
/************************ Ações executadas para a rota base /usuarios ************************/

export { rotasUsuarios };
