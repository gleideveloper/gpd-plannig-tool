import { rotasLivros } from "./livros";
import { rotasOperadoras } from "./operadoras";
import { HomeController } from "../controllers/HomeController";

import { Router } from "express";

const rotas = Router();
const homeController = new HomeController();

rotas.get("/", homeController.home.bind(homeController));

/************************ Ações executadas para a rota base /livros ************************/
rotas.use("/livros", rotasLivros);

/************************ Ações executadas para a rota base /operadorass ************************/
rotas.use("/operadoras", rotasOperadoras);

export { rotas };
