import { TemplateDTO } from "../dto/TemplateDTO";
import { TemplateParaAtualizarDTO } from "../dto/TemplateParaAtualizarDTO";
import { TemplateParaCriarDTO } from "../dto/TemplateParaCriarDTO";
import { Template } from "../modelos/Template";
import { TemplateDTOMapper } from "../objectmapper/TemplateDTOMapper";
import { TemplatesRepository } from "../repositorios/TemplatesRepository";

/**
 *
 * Classe de serviço que executa as regras de
 * negócio de templates na aplicação.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class TemplatesService {
  /**
   *
   * Instância de um repositório de templates.
   */
  private repository: TemplatesRepository;

  /**
   *
   * Instância de um mapeador de objetos.
   */
  private objectMapper: TemplateDTOMapper;

  /**
   *
   * Recebemos as dependências da classe
   * pelo construtor, implementando o padrão
   * de projetos Injeção de Dependências.
   *
   * @param repository Instância de um repositório de templates.
   * @param objectMapper Instância de um mapeador de objetos.
   */
  public constructor(
    repository: TemplatesRepository,
    objectMapper: TemplateDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  /**
   *
   * Método que busca todos os templates
   * cadastrados na aplicação.
   *
   * @returns Lista de templates.
   */
  public async buscarTodos(): Promise<TemplateDTO[]> {
    const templates = await this.repository.buscarTodos();

    return await this.objectMapper.mapearListaOrigemParaListaDestino(templates);
  }

  /**
   *
   * Método que busca os dados de um template
   * a partir do tipo.
   *
   * @param tipo Tipo do template pesquisado.
   * @returns Dados do template.
   */
  public async buscarTemplatePorTipo(tipo: string): Promise<TemplateDTO> {
    const template = await this.repository.buscarPorTipo(tipo);

    return await this.objectMapper.mapearOrigemParaDestino(template);
  }

}

export { TemplatesService };
