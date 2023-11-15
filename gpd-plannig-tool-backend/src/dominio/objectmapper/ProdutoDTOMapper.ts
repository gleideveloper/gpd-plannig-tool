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
      data_sa: modelo.data_sa,
      lider_npi: modelo.lider_npi,
      template_type: modelo.template_type,
      hr_json: modelo.hr_json,
    };
  }
}

export { ProdutoDTOMapper };
