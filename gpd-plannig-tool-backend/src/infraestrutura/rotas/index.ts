import {Router} from "express";
import {HomeController} from "../controllers/HomeController";
import {rotasProdutos} from "@/infraestrutura/rotas/produtos";
import {rotasLivros} from "@/infraestrutura/rotas/livros";
import {rotasUsuarios} from "@/infraestrutura/rotas/usuario";

const rotas = Router();
const homeController = new HomeController();

rotas.get("/", homeController.home.bind(homeController));

/************************ Ações executadas para a rota base /livros ************************/
rotas.use("/livros", rotasLivros);

/************************ Ações executadas para a rota base /produtos ************************/
rotas.use("/produtos", rotasProdutos);


rotas.use("/usuarios", rotasUsuarios);

export { rotas };

