import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { ProdutoParaAtualizarDTO } from "@/dominio/dto/ProdutoParaAtualizarDTO";
import { ProdutoParaCriarDTO } from "@/dominio/dto/ProdutoParaCriarDTO";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ProdutoDTOMapper } from "@/dominio/objectmapper/ProdutoDTOMapper";
import { ProdutosService } from "@/dominio/servicos/ProdutosService";
import { SequelizeProdutosRepository } from "../repositorios/sequelize/SequelizeProdutosRepository";

import { NextFunction, Request, Response } from "express";

Dotenv.carregarVariaveis();

/**
 *
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada
 * para a rota base **\/api/produtos**.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class ProdutosController {
    /**
     *
     * Instância da classe de serviço de
     * produtos.
     */
    private service: ProdutosService;

    /**
     *
     * Instância de logger da aplicação.
     */
    private logger: Logger;

    public constructor() {
        this.service = new ProdutosService(
            new SequelizeProdutosRepository(),
            new ProdutoDTOMapper()
        );
        this.logger = Logger.pegarInstancia();
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **GET /produtos**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     */
    public async buscarTodos(req: Request, res: Response): Promise<void> {
        const produtos = await this.service.buscarTodos();

        res.json(produtos);
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **GET /produtos/:isbn**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     * @param next Referência do middleware de exceções.
     */
    public async buscarProdutoPorId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const produto = await this.service.buscarProdutoPorId(id);

            res.json(produto);
        } catch (erro: any) {
            this.logger.error(
                `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
            );
            next(erro);
        }
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **POST /produtos**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     * @param next Referência do middleware de exceções.
     */
    public async cadastrarNovoProduto(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const novoProduto: ProdutoParaCriarDTO = req.body as ProdutoParaCriarDTO;
            console.log(`novoProduto: ${novoProduto}`)
            const resultado = await this.service.cadastrarNovoProduto(novoProduto);
            console.log(`resultado: ${resultado}`)

            if (!resultado)
                throw new RegistroNaoSalvoError(
                    `O produto com nome ${novoProduto.nome} não foi salvo no banco de dados.`
                );

            res.status(201).json(resultado);
        } catch (erro: any) {
            this.logger.error(
                `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
            );
            next(erro);
        }
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **PATCH /produtos/:isbn**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     * @param next Referência do middleware de exceções.
     */
    public async atualizarProduto(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const dadosParaAtualizar = req.body as ProdutoParaAtualizarDTO;
            const { isbn } = req.params;

            const resultado = await this.service.atualizarProduto(
                isbn,
                dadosParaAtualizar
            );
            if (!resultado)
                throw new RegistroNaoSalvoError(
                    `O produto com código ISBN ${isbn} não foi atualizado no banco de dados.`
                );

            res.json(resultado);
        } catch (erro: any) {
            this.logger.error(
                `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
            );
            next(erro);
        }
    }

    /**
     *
     * Método que responde a ação de chamada para a
     * rota **DELETE /produtos/:isbn**.
     *
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     * @param next Referência do middleware de exceções.
     */
    public async deletarProduto(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { isbn } = req.params;
            await this.service.deletarProduto(isbn);

            res.sendStatus(200);
        } catch (erro: any) {
            this.logger.error(
                `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
            );
            next(erro);
        }
    }
}

export { ProdutosController };
