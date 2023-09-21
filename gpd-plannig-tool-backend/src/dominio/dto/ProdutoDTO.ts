/**
 *
 * Definição de tipo DTO que encapsula os dados
 * de um livro.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
type ProdutoDTO = {
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

export { ProdutoDTO };
