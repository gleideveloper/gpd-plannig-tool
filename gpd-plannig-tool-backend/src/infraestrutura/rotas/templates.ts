import { TemplatesController } from "../controllers/TemplatesController";
import { Router } from "express";

const rotasTemplates = Router();
const templatesController = new TemplatesController();

/************************ Ações executadas para a rota base /templates ************************/
rotasTemplates.get("/", templatesController.buscarTodos.bind(templatesController));
rotasTemplates.get(
  "/:tipo",
  templatesController.buscarTemplatePorTipo.bind(templatesController)
);
/************************ Ações executadas para a rota base /templates ************************/

export { rotasTemplates };
