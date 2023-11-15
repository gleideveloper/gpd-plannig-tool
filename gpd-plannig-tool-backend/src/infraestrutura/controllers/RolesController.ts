import {Dotenv} from "@/common/Dotenv";
import {Logger} from "@/common/Logger";
import {RoleDTOMapper} from "@/dominio/objectmapper/RoleDTOMapper";
import {RolesService} from "@/dominio/servicos/RolesService";
import {SequelizeRolesRepository} from "../repositorios/sequelize/SequelizeRolesRepository";

import {NextFunction, Request, Response} from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/roles**.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class RolesController {
    /**
     *
     * Instância da classe de serviço de
     * roles.
     */
    private service: RolesService;

    /**
     *
     * Instância de logger da aplicação.
     */
    private logger: Logger;

    public constructor() {
        this.service = new RolesService(
            new SequelizeRolesRepository(),
            new RoleDTOMapper()
        );
        this.logger = Logger.pegarInstancia();
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **GET /roles**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     */
    public async buscarTodos(req: Request, res: Response): Promise<void> {
        const roles = await this.service.buscarTodos();
        const rolesFormatados = roles.map((role) => ({
            role_name: role.role_name,
            description: role.description,
        }));
        res.json(rolesFormatados);
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **GET /roles/:isbn**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     * @param next Referência do middleware de exceções.
     */
    public async buscarRolePorId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { role_name } = req.params;
            const role = await this.service.buscarRolePorName(role_name);

            res.json(role);
        } catch (erro: any) {
            this.logger.error(
                `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
            );
            next(erro);
        }
    }
    
}

export { RolesController };
