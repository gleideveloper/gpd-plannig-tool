import { ObjectMapper } from "@/common/ObjectMapper";
import { ProdutoDTO } from "../dto/ProdutoDTO";
import { Produto } from "../modelos/Produto";

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
      familia: modelo.familia,
      chipset: modelo.chipset,
      escopo: modelo.escopo,
      band: modelo.network_band,
      odm: modelo.odm,
      operadora: modelo.operadora,
    };
  }
}

export { ProdutoDTOMapper };
