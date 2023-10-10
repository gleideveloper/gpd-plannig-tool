import { ObjectMapper } from "@/common/ObjectMapper";
import { TemplateDTO } from "../dto/TemplateDTO";
import { Template } from "../modelos/Template";

/**
 *
 * Implementação da interface de mapeamento de objetos
 * de origem {@link Template} para objetos de
 * destino {@link TemplateDTO}.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
class TemplateDTOMapper extends ObjectMapper<Template, TemplateDTO> {
  public constructor() {
    super();
  }

  /**
   *
   * Implementação do método que mapeia um objeto de
   * origem {@link Template} para um objeto
   * de destino {@link TemplateDTO}.
   * 
   * @author Andre Xavier <xavier.andre256@gmail.com>
   */
  public async mapearOrigemParaDestino(modelo: Template): Promise<TemplateDTO> {
    return {
      template_type: modelo.template_type,
      sa_idx: modelo.sa_idx,
      peak_ammount: modelo.peak_ammount,
    };
  }
}

export { TemplateDTOMapper };
