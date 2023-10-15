import {Template} from "@/dominio/modelos/Template";

/**
 *
 * Definição de tipo DTO que encapsula os dados
 * de um livro.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
type ProdutoDTO = {
    nome: string;
    data_sa: Date,
    lider_npi: string;
    template_type: string;
};

export { ProdutoDTO };
