import { Logger } from "@/common/Logger";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ValidacaoError } from "@/dominio/excecoes/ValidacaoError";
import { Usuario } from "@/dominio/modelos/Usuario";
import { UsuariosRepository } from "@/dominio/repositorios/UsuariosRepository";

import { UniqueConstraintError, ValidationError } from "sequelize";

class SequelizeUsuariosRepository implements UsuariosRepository {
  private logger: Logger;

  public constructor() {
    this.logger = Logger.pegarInstancia();
  }

  public async buscarTodos(): Promise<Usuario[]> {
    return await Usuario.findAll();
  }

  public async buscarPorId(id: string): Promise<Usuario> {
    const usuario = await Usuario.findOne({
      where: {
        id: id,
      },
    });

    if (usuario === null)
      throw new RegistroNaoEncontradoError(
        `O usuário de ID ${id} não foi encontrado.`
      );

    return usuario;
  }

  public async existe(id: string): Promise<boolean> {
    const resultado = await Usuario.findOne({
      where: {
        id: id,
      },
    });

    return !!resultado === true;
  }

  public async remover(id: string): Promise<number> {
    return await Usuario.destroy({
      where: {
        id: id,
      },
    });
  }

  public async salvar(usuario: Usuario): Promise<Usuario> {
    let usuarioSalvo: Usuario | null = null;
    const usuarioExiste = await this.existe(usuario.id as string);

    if (usuarioExiste) usuarioSalvo = await this.atualizarUsuario(usuario);
    else usuarioSalvo = await this.criarNovoUsuario(usuario);

    return usuarioSalvo;
  }

  private async criarNovoUsuario(usuario: Usuario): Promise<Usuario> {
    try {
      return await Usuario.create(
        {
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          // Adicione outros campos conforme necessário
        },
        {
          returning: true,
        }
      );
    } catch (erro: any) {
      if (erro instanceof UniqueConstraintError) {
        const mensagem = `O email ${usuario.email} já está associado a um usuário.`;

        this.logger.error(mensagem);
        throw new RegistroNaoSalvoError(mensagem); // Adaptado para usuário
      } else if (erro instanceof ValidationError) {
        const mensagem = "Há valores inválidos em alguns campos.";
        const errosValidacao = {};
        for (let itemErro of erro.errors) {
          const campo = itemErro.path as string;
          const textoValidacao = itemErro.message;
          errosValidacao[campo] = textoValidacao;
        }

        this.logger.error(mensagem);
        this.logger.error(JSON.stringify(errosValidacao));

        throw new ValidacaoError(mensagem, errosValidacao);
      } else {
        const mensagem = `Falha ao criar um novo usuário com email ${usuario.email}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  private async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    try {
      let usuarioBanco = await this.buscarPorId(usuario.id as string);

      return await usuarioBanco.update({
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        // Atualize outros campos conforme necessário
      });
    } catch (erro: any) {
      if (erro instanceof ValidationError) {
        const mensagem = "Há valores inválidos em alguns campos.";
        const errosValidacao = {};
        for (let itemErro of erro.errors) {
          const campo = itemErro.path as string;
          const textoValidacao = itemErro.message;
          errosValidacao[campo] = textoValidacao;
        }

        this.logger.error(mensagem);
        this.logger.error(JSON.stringify(errosValidacao));

        throw new ValidacaoError(mensagem, errosValidacao);
      } else {
        const mensagem = `Falha ao atualizar o usuário com email ${usuario.email}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeUsuariosRepository };

