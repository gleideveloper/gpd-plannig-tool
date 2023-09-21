import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { UsuarioParaAtualizarDTO } from "@/dominio/dto/UsuarioParaAtualizarDTO";
import { UsuarioParaCriarDTO } from "@/dominio/dto/UsuarioParaCriarDTO";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { UsuarioDTOMapper } from "@/dominio/objectmapper/UsuarioDTOMapper";
import { UsuariosService } from "@/dominio/servicos/UsuariosService";
import { SequelizeUsuariosRepository } from "../repositorios/sequelize/SequelizeUsuariosRepository";

import { NextFunction, Request, Response } from "express";

Dotenv.carregarVariaveis();

class UsuariosController {
  private service: UsuariosService;
  private logger: Logger;

  public constructor() {
    this.service = new UsuariosService(
      new SequelizeUsuariosRepository(),
      new UsuarioDTOMapper()
    );
    this.logger = Logger.pegarInstancia();
  }

  public async buscarTodos(req: Request, res: Response): Promise<void> {
    const usuarios = await this.service.buscarTodos();
    res.json(usuarios);
  }

  public async buscarUsuarioPorId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await this.service.buscarUsuarioPorId(id);
      res.json(usuario);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }

  public async cadastrarNovoUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const novoUsuario: UsuarioParaCriarDTO = req.body as UsuarioParaCriarDTO;
      console.log(novoUsuario)
      const resultado = await this.service.cadastrarNovoUsuario(novoUsuario);
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O usuário com ID ${novoUsuario.id} não foi salvo no banco de dados.`
        );
      res.status(201).json(resultado);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }

  public async atualizarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dadosParaAtualizar = req.body as UsuarioParaAtualizarDTO;
      const { id } = req.params;
      const resultado = await this.service.atualizarUsuario(
        id,
        dadosParaAtualizar
      );
      if (!resultado)
        throw new RegistroNaoSalvoError(
          `O usuário com ID ${id} não foi atualizado no banco de dados.`
        );
      res.json(resultado);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }

  public async deletarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.deletarUsuario(id);
      res.sendStatus(200);
    } catch (erro: any) {
      this.logger.error(
        `Exceção lançada na rota ${req.method} ${req.originalUrl}: ${erro.message}`
      );
      next(erro);
    }
  }
}

export { UsuariosController };

