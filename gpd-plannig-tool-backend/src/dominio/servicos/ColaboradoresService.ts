import { ColaboradorDTO } from "../dto/ColaboradorDTO";
import { ColaboradorDTOMapper } from "../objectmapper/ColaboradoresDTOMapper";
import { ColaboradoresRepository } from "../repositorios/ColaboradoresRepository";

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

}

export { ColaboradoresService };
