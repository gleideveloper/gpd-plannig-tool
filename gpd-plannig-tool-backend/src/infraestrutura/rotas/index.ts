
import { rotasOperadoras } from "./operadoras";
import {rotasProdutos} from "@/infraestrutura/rotas/produtos";
import {rotasLivros} from "@/infraestrutura/rotas/livros";
import {rotasUsuarios} from "@/infraestrutura/rotas/usuario";
import { HomeController } from "../controllers/HomeController";
import { Router } from "express";
import { rotasTemplates } from "./templates";
import { rotasColaboradores } from './colaboradores'

const rotas = Router();
const homeController = new HomeController();

rotas.get("/", homeController.home.bind(homeController));

/************************ Ações executadas para a rota base /livros ************************/
rotas.use("/livros", rotasLivros);


/************************ Ações executadas para a rota base /operadorass ************************/
rotas.use("/operadoras", rotasOperadoras);

rotas.use("/produtos", rotasProdutos);

rotas.use("/usuarios", rotasUsuarios);

rotas.use("/templates", rotasTemplates);

rotas.use("/colaboradores", rotasColaboradores);

/************************ Ações executadas para a rota base /produtos ************************/

export { rotas };

