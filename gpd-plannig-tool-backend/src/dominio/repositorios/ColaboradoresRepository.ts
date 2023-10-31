import { BaseRepository } from "./BaseRepository";
import {Colaborador} from "@/dominio/modelos/Colaborador";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de colaboradores na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
interface ColaboradoresRepository extends BaseRepository<Colaborador, string> {

}

export { ColaboradoresRepository };
