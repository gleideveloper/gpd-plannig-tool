import { ObjectMapper } from "@/common/ObjectMapper";
import { Produto } from "../modelos/Produto";
import {ProdutoDTO} from "@/dominio/dto/ProdutoDTO";

/**
 *
 * Implementação da interface de mapeamento de objetos
 * de origem {@link Produto} para objetos de
 * destino {@link ProdutoDTO}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class ProdutoDTOMapper extends ObjectMapper<Produto, ProdutoDTO> {
  public constructor() {
    super();
  }

  /**
   *
   * Implementação do método que mapeia um objeto de
   * origem {@link Produto} para um objeto
   * de destino {@link ProdutoDTO}.
   */
  public async mapearOrigemParaDestino(modelo: Produto): Promise<ProdutoDTO> {
    return {
      nome: modelo.nome,
      dataSa: modelo.data_sa,
      lider: modelo.lider_npi,
      template_type: modelo.template_type,
    };
  }
}

export { ProdutoDTOMapper };
