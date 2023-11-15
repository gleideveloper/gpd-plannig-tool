import { BaseRepository } from "./BaseRepository";
import { Colaborador } from "@/dominio/modelos/Colaborador";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de colaboradores na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Laura Lima
 */
interface ColaboradoresRepository extends BaseRepository<Colaborador, string> {
    /**
     *
     * Método que busca pelos registros dos colaboradores de um tipo especifico 
     * @param tipo Tipo do template pesquisado.
     * @returns Dados do template encontrado.
     */
    buscarPorTipo(tipo: string): Promise<Colaborador[]>;
}

export { ColaboradoresRepository };
