import { ObjectMapper } from "@/common/ObjectMapper";
import { OperadoraDTO } from "../dto/OperadoraDTO";
import { Operadora } from "../modelos/Operadora";

/**
 *
 * Implementação da interface de mapeamento de objetos
 * de origem {@link Operadora} para objetos de
 * destino {@link OperadoraDTO}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class OperadoraDTOMapper extends ObjectMapper<Operadora, OperadoraDTO> {
  public constructor() {
    super();
  }

  /**
   *
   * Implementação do método que mapeia um objeto de
   * origem {@link Operadora} para um objeto
   * de destino {@link OperadoraDTO}.
   * 
   * @author Andre Xavier <xavier.andre256@gmail.com>
   */
  public async mapearOrigemParaDestino(modelo: Operadora): Promise<OperadoraDTO> {
    return {
      nome: modelo.nome,
      regiao: modelo.regiao,
    };
  }
}

export { OperadoraDTOMapper };
