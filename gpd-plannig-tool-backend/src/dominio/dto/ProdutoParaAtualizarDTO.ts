/**
 *
 * Definição de tipo DTO que encapsula os dados
 * de um produto para atualizar.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
type ProdutoParaAtualizarDTO = {
    nome: string;
    data_sa: Date,
    lider_npi: string;
    template_type: string,
    hr_json: string,
};

export { ProdutoParaAtualizarDTO };
