import { ObjectMapper } from "@/common/ObjectMapper";
import { ColaboradorDTO } from "../dto/ColaboradorDTO";
import { Colaborador } from "../modelos/Colaborador";


export class ColaboradorDTOMapper {
    public mapearOrigemParaDestino(origem: Colaborador): ColaboradorDTO {
        
      return {
        id: origem.id,
        departamento: origem.departamento,
        role_name: origem.role_name,
        nome: origem.nome
        // Outros campos
      };
    }
  
    public mapearListaOrigemParaListaDestino(origens: Colaborador[]): ColaboradorDTO[] {
      return origens.map(this.mapearOrigemParaDestino);
    }
}
