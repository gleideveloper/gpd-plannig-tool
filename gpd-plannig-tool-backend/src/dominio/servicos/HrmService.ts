import { HrmDTO } from "../dto/HrmDTO";
import { HrmParaAtualizarDTO } from "../dto/HrmParaAtualizarDTO";
import { HrmParaCriarDTO } from "../dto/HrmParaCriarDTO";
import { Hrm } from "../modelos/Hrm";
import { HrmDTOMapper } from "../objectmapper/HrmDTOMapper";
import { HrmsRepository } from "../repositorios/HrmsRepository";

/**
 *
 * Classe de serviço que executa as regras de
 * negócio de hrms na aplicação.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class HrmsService {
  /**
   *
   * Instância de um repositório de hrms.
   */
  private repository: HrmsRepository;

  /**
   *
   * Instância de um mapeador de objetos.
   */
  private objectMapper: HrmDTOMapper;

  /**
   *
   * Recebemos as dependências da classe
   * pelo construtor, implementando o padrão
   * de projetos Injeção de Dependências.
   *
   * @param repository Instância de um repositório de hrms.
   * @param objectMapper Instância de um mapeador de objetos.
   */
  public constructor(
    repository: HrmsRepository,
    objectMapper: HrmDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  /**
   *
   * Método que busca todos os hrms
   * cadastrados na aplicação.
   *
   * @returns Lista de hrms.
   */
  public async buscarTodos(): Promise<HrmDTO[]> {
    const hrms = await this.repository.buscarTodos();

    return await this.objectMapper.mapearListaOrigemParaListaDestino(hrms);
  }

  /**
   *
   * Método que busca os dados de um hrm
   * a partir do id.
   *
   * @param id Id do hrm pesquisado.
   * @returns Dados do hrm.
   */
  public async buscarHrmPorId(id: string): Promise<HrmDTO> {
    const hrm = await this.repository.buscarPorId(id);

    return await this.objectMapper.mapearOrigemParaDestino(hrm);
  }

  /**
   *
   * Método que cadastra um novo hrm.
   *
   * @param novoHrm Dados do novo hrm.
   * @returns Registro do novo hrm criado.
   */
  public async cadastrarNovoHrm(
    novoHrm: HrmParaCriarDTO
  ): Promise<HrmDTO> {
    const hrm = new Hrm({
      template_id: novoHrm.template_id,
      produto_id: novoHrm.produto_id,
    });
    const registro = await this.repository.salvar(hrm);

    return await this.objectMapper.mapearOrigemParaDestino(registro);
  }

  /**
   *
   * Método que atualiza os dados de um hrm.
   *
   * @param id Id do hrm a ser atualizado.
   * @param dadosParaAtualizar Dados do hrm para atualizar.
   * @returns Registro do hrm atualizado.
   */
  public async atualizarHrm(
    id: string,
    dadosParaAtualizar: HrmParaAtualizarDTO
  ): Promise<HrmDTO> {
    const hrm = await this.repository.buscarPorId(id);

    hrm.set({
      template_id: dadosParaAtualizar.template_id,
      produto_id: dadosParaAtualizar.produto_id,
    });
    await this.repository.salvar(hrm);

    return await this.objectMapper.mapearOrigemParaDestino(hrm);
  }

  /**
   *
   * Método que apaga um hrm a partir do id.
   *
   * @param id Id do hrm a ser apagado.
   * @returns Sucesso ou falha na operação.
   */
  public async deletarHrm(id: string): Promise<boolean> {
    const hrm = await this.repository.buscarPorId(id);
    const resultado = await this.repository.remover(hrm.id as string);

    return resultado === 1;
  }
}

export { HrmsService };
