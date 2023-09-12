import { rotasLivros } from "./livros";
import { HomeController } from "../controllers/HomeController";

import { Router } from "express";

const rotas = Router();
const homeController = new HomeController();

rotas.get("/", homeController.home.bind(homeController));

/************************ Ações executadas para a rota base /livros ************************/
rotas.use("/livros", rotasLivros);
/************************ Ações executadas para a rota base /livros ************************/

export { rotas };
