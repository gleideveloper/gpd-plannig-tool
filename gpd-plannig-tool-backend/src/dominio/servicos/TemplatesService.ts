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

  /**
   *
   * Método que cadastra um novo template.
   *
   * @param novoTemplate Dados do novo template.
   * @returns Registro do novo template criado.
   */
  public async cadastrarNovoTemplate(
    novoTemplate: TemplateParaCriarDTO
  ): Promise<TemplateDTO> {
    const template = new Template({
      template_type: novoTemplate.template_type,
      sa_idx: novoTemplate.sa_idx,
      peak_amount: novoTemplate.peak_amount
    });
    const registro = await this.repository.salvar(template);

    return await this.objectMapper.mapearOrigemParaDestino(registro);
  }

  /**
   *
   * Método que atualiza os dados de um template.
   *
   * @param tipo Tipo do template a ser atualizado.
   * @param dadosParaAtualizar Dados do template para atualizar.
   * @returns Registro do template atualizado.
   */
  public async atualizarTemplate(
    tipo: string,
    dadosParaAtualizar: TemplateParaAtualizarDTO
  ): Promise<TemplateDTO> {
    const template = await this.repository.buscarPorTipo(tipo);

    template.set({
      template_type: dadosParaAtualizar.template_type,
      sa_idx: dadosParaAtualizar.sa_idx,
    });
    await this.repository.salvar(template);

    return await this.objectMapper.mapearOrigemParaDestino(template);
  }

  /**
   *
   * Método que apaga um template a partir do tipo.
   *
   * @param tipo Tipo do template a ser apagado.
   * @returns Sucesso ou falha na operação.
   */
  public async deletarTemplate(tipo: string): Promise<boolean> {
    const template = await this.repository.buscarPorTipo(tipo);
    const resultado = await this.repository.remover(template.id as string);

    return resultado === 1;
  }
}

export { TemplatesService };
