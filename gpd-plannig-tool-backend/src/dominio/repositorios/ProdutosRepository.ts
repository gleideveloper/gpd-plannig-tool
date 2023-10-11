import { BaseRepository } from "./BaseRepository";
import { Produto } from "../modelos/Produto";

/**
 *
 * Interface que define as operações básicas
 * de manipulação de registros de produtos na
 * base de dados da aplicação.
 *
 * Esta interface extende a interface {@link BaseRepository}.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
interface ProdutosRepository extends BaseRepository<Produto, string> {
    /**
     *
     * Método que busca por um registro de um
     * produto na base de dados da aplicação a
     * partir do familia do produto.
     *
    //  * @param familia Código ISBN do produto pesquisado.
    //  * @returns Dados do produto encontrado.
    //  */
    // buscarPorFamilia(familia: string): Promise<Produto>;
    listarProdutos(): Promise<Produto[]>;

}

export { ProdutosRepository };
