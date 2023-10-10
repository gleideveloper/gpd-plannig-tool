/**
 *
 * Definição de tipo DTO que encapsula os dados
 * de um produto para atualizar.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
type ProdutoParaAtualizarDTO = {
    nome: string;
    dataSa: Date,
    lider: string;
    template_type: string,
};

export { ProdutoParaAtualizarDTO };
