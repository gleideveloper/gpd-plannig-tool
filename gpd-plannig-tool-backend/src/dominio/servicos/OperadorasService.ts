import { OperadoraDTO } from "../dto/OperadoraDTO";
import { OperadoraParaAtualizarDTO } from "../dto/OperadoraParaAtualizarDTO";
import { OperadoraParaCriarDTO } from "../dto/OperadoraParaCriarDTO";
import { Operadora } from "../modelos/Operadora";
import { OperadoraDTOMapper } from "../objectmapper/OperadoraDTOMapper";
import { OperadorasRepository } from "../repositorios/OperadorasRepository";

/**
 *
 * Classe de serviço que executa as regras de
 * negócio de operadoras na aplicação.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class OperadorasService {
  /**
   *
   * Instância de um repositório de operadoras.
   */
  private repository: OperadorasRepository;

  /**
   *
   * Instância de um mapeador de objetos.
   */
  private objectMapper: OperadoraDTOMapper;

  /**
   *
   * Recebemos as dependências da classe
   * pelo construtor, implementando o padrão
   * de projetos Injeção de Dependências.
   *
   * @param repository Instância de um repositório de operadoras.
   * @param objectMapper Instância de um mapeador de objetos.
   */
  public constructor(
    repository: OperadorasRepository,
    objectMapper: OperadoraDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  /**
   *
   * Método que busca todas os operadoras
   * cadastradas na aplicação.
   *
   * @returns Lista de operadoras.
   */
  public async buscarTodos(): Promise<OperadoraDTO[]> {
    const operadoras = await this.repository.buscarTodos();

    return await this.objectMapper.mapearListaOrigemParaListaDestino(operadoras);
  }

  /**
   *
   * Método que busca os dados de uma operadora
   * a partir do nome.
   *
   * @param nome Nome da operadora pesquisada.
   * @returns Dados do operadora.
   */
  public async buscarOperadoraPorNome(nome: string): Promise<OperadoraDTO> {
    const operadora = await this.repository.buscarPorNome(nome);

    return await this.objectMapper.mapearOrigemParaDestino(operadora);
  }

  /**
   *
   * Método que cadastra uma nova operadora.
   *
   * @param novaOperadora Dados da nova operadora.
   * @returns Registro da nova operadora criada.
   */
  public async cadastrarNovaOperadora(
    novaOperadora: OperadoraParaCriarDTO
  ): Promise<OperadoraDTO> {
    const operadora = new Operadora({
      nome: novaOperadora.nome,
      regiao: novaOperadora.regiao,
    });
    const registro = await this.repository.salvar(operadora);

    return await this.objectMapper.mapearOrigemParaDestino(registro);
  }

  /**
   *
   * Método que atualiza os dados de uma operadora.
   *
   * @param nome Nome da operadora a ser atualizada.
   * @param dadosParaAtualizar Dados da operadora para atualizar.
   * @returns Registro da operadora atualizada.
   */
  public async atualizarOperadora(
    nome: string,
    dadosParaAtualizar: OperadoraParaAtualizarDTO
  ): Promise<OperadoraDTO> {
    const operadora = await this.repository.buscarPorNome(nome);

    operadora.set({
      nome: dadosParaAtualizar.nome,
      regiao: dadosParaAtualizar.regiao,
    });
    await this.repository.salvar(operadora);

    return await this.objectMapper.mapearOrigemParaDestino(operadora);
  }

  /**
   *
   * Método que apaga uma operadora a partir do nome.
   *
   * @param nome Nome da operadora a ser apagada.
   * @returns Sucesso ou falha na operação.
   */
  public async deletarOperadora(nome: string): Promise<boolean> {
    const operadora = await this.repository.buscarPorNome(nome);
    const resultado = await this.repository.remover(operadora.id as string);

    return resultado === 1;
  }
}

export { OperadorasService };
