import { RolesController } from "../controllers/RolesController";
import { Router } from "express";

const rotasRoles = Router();
const rolesController = new RolesController();

/************************ Ações executadas para a rota base /roles ************************/
rotasRoles.get("/", rolesController.buscarTodos.bind(rolesController));
rotasRoles.get(
  "/:role_name",
  rolesController.buscarRolePorId.bind(rolesController)
);
export { rotasRoles };
