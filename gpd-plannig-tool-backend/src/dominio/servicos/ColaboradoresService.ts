import { ColaboradorDTOMapper } from "../objectmapper/ColaboradoresDTOMapper";
import { ColaboradoresRepository } from "../repositorios/ColaboradoresRepository";
import {ColaboradorDTO} from "@/dominio/dto/ColaboradorDTO";

class ColaboradoresService {
  private repository: ColaboradoresRepository;
  private objectMapper: ColaboradorDTOMapper;

  public constructor(
    repository: ColaboradoresRepository,
    objectMapper: ColaboradorDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }


  public async buscarColaboradoresPorTipo(tipo: string): Promise<ColaboradorDTO[]> {
    const colaboradores = await this.repository.buscarPorTipo(tipo);
    return await this.objectMapper.mapearListaOrigemParaListaDestino(colaboradores);
  }

  public async buscarTodos(): Promise<ColaboradorDTO[]> {
    const operadoras = await this.repository.buscarTodos();
    return await this.objectMapper.mapearListaOrigemParaListaDestino(operadoras);
  }
    /**
     * Método que busca os dados de um colaborador
     * a partir de um código id.
     *
     * @param id Código do colaborador pesquisado.
     * @returns Dados do colaborador.
     */
    public async buscarColaboradorPorId(id: string): Promise<ColaboradorDTO> {
        const colaborador = await this.repository.buscarPorId(id);

        return await this.objectMapper.mapearOrigemParaDestino(colaborador);
    }
}

export { ColaboradoresService };
