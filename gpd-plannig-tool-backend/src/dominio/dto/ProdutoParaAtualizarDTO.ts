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
    familia: string;
    chipset: string;
    escopo: string;
    band: string;
    odm: boolean;
    operadora: string;
};

export { ProdutoParaAtualizarDTO };
