import { Logger } from "@/common/Logger";
import { TipoUnicoError } from "@/dominio/excecoes/TipoUnicoError";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { RegistroNaoSalvoError } from "@/dominio/excecoes/RegistroNaoSalvoError";
import { ValidacaoError } from "@/dominio/excecoes/ValidacaoError";
import { Template } from "@/dominio/modelos/Template";
import { TemplatesRepository } from "@/dominio/repositorios/TemplatesRepository";

import { UniqueConstraintError, ValidationError } from "sequelize";

/**
 *
 * Classe que implementa as operações de manipulação
 * de registros de templates no banco de dados da aplicação,
 * implementando a utilização do framework ORM Sequelize.
 *
 * Esta classe implementa a interface {@link TemplatesRepository}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class SequelizeTemplatesRepository implements TemplatesRepository {
  /**
   *
   * Instância de logger da aplicação.
   */
  private logger: Logger;

  public constructor() {
    this.logger = Logger.pegarInstancia();
  }

  /**
   *
   * Implementação do método que busca todos
   * os registros da base de dados da aplicação.
   *
   * @see {@link TemplatesRepository.buscarTodos}
   */
  public async buscarTodos(): Promise<Template[]> {
    return await Template.findAll();
  }

  /**
   *
   * Implementação do método que busca por
   * um registro de um objeto na base de
   * dados da aplicação a partir de um ID.
   *
   * @see {@link TemplatesRepository.buscarPorId}
   * @throws {RegistroNaoEncontradoError} O template não foi encontrado.
   */
  public async buscarPorId(id: string): Promise<Template> {
    const template = await Template.findOne({
      where: {
        id: id,
      },
    });

    if (template === null)
      throw new RegistroNaoEncontradoError(
        `O template de ID ${id} não foi encontrado.`
      );

    return template;
  }

  /**
   *
   * Implementação do método que verifica se
   * um registro com um determinado ID existe
   * na base de dados da aplicação.
   *
   * @see {@link TemplatesRepository.existe}
   */
  public async existe(id: string): Promise<boolean> {
    const resultado = await Template.findOne({
      where: {
        template_type: id,
      },
    });

    return !!resultado === true;
  }

  /**
   *
   * Implementação do método que remove um
   * registro da base de dados da aplicação
   * a partir de um ID.
   *
   * @see {@link TemplatesRepository.remover}
   */
  public async remover(id: string): Promise<number> {
    return await Template.destroy({
      where: {
        id: id,
      },
    });
  }

  /**
   *
   * Implementação do método que salva um
   * registro de um objeto na base de dados
   * da aplicação.
   *
   * @see {@link TemplatesRepository.salvar}
   */
  public async salvar(template: Template): Promise<Template> {
    let templateSalva: Template | null = null;
    const templateExiste = await this.existe(template.template_type as string);

    if (templateExiste) templateSalva = await this.atualizarTemplate(template);
    else templateSalva = await this.criarNovoTemplate(template);

    return templateSalva;
  }

  /**
   *
   * Implementação do método que busca por um
   * registro de uma template na base de dados da
   * aplicação a partir do tipo do template.
   *
   * @see {@link TemplatesRepository.buscarPorTipo}
   * @throws {RegistroNaoEncontradoError} O template não foi encontrado.
   */
  public async buscarPorTipo(tipo: string): Promise<Template> {
    const template = await Template.findOne({
      where: {
        template_type: tipo,
      },
    });

    if (template === null)
      throw new RegistroNaoEncontradoError(
        `O template com tipo ${tipo} não foi encontrada.`
      );

    return template;
  }

  /**
   *
   * Método que insere um novo template na base de dados
   * da aplicação.
   *
   * @param template Dados do novo template.
   * @returns Instância do novo template inserido.
   * @throws {RegistroNaoSalvoError} Houve uma falha ao criar um novo template.
   */
  private async criarNovoTemplate(template: Template): Promise<Template> {
    try {
      return await Template.create(
        {
          template_type: template.template_type,
          sa_idx: template.sa_idx,
          peak_amount: template.peak_ammount
        },
        {
          returning: true,
        }
      );
    } catch (erro: any) {
      if (erro instanceof UniqueConstraintError) {
        const mensagem = `O tipo ${template.template_type} já está associado a um template.`;

        this.logger.error(mensagem);

        throw new TipoUnicoError(mensagem);
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
        const mensagem = `Falha ao criar um novo template com tipo ${template.template_type}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }

  /**
   *
   * Método que atualiza os dados de um template na base
   * de dados da aplicação.
   *
   * @param template Dados do template a ser atualizado.
   * @returns Instância do template atualizado.
   */
  private async atualizarTemplate(template: Template): Promise<Template> {
    try {
      let templateBanco = await this.buscarPorId(template.template_type as string);

      return await templateBanco.update({
        template_type: template.template_type,
        sa_idx: template.sa_idx,
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
        const mensagem = `Falha ao atualizar um template com tipo ${template.template_type}: ${erro.message}`;

        this.logger.error(mensagem);

        throw new RegistroNaoSalvoError(mensagem);
      }
    }
  }
}

export { SequelizeTemplatesRepository };
