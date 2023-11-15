import { ProdutoDTO } from "../dto/ProdutoDTO";
import { ProdutoParaAtualizarDTO } from "../dto/ProdutoParaAtualizarDTO";
import { ProdutoParaCriarDTO } from "../dto/ProdutoParaCriarDTO";
import { Produto } from "../modelos/Produto";
import { ProdutoDTOMapper } from "../objectmapper/ProdutoDTOMapper";
import { ProdutosRepository } from "../repositorios/ProdutosRepository";

/**
 *
 * Classe de serviço que executa as regras de
 * negócio de produtos na aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class ProdutosService {
  /**
   *
   * Instância de um repositório de produtos.
   */
  private repository: ProdutosRepository;

  /**
   *
   * Instância de um mapeador de objetos.
   */
  private objectMapper: ProdutoDTOMapper;

  /**
   *
   * Recebemos as dependências da classe
   * pelo construtor, implementando o padrão
   * de projetos Injeção de Dependências.
   *
   * @param repository Instância de um repositório de produtos.
   * @param objectMapper Instância de um mapeador de objetos.
   */
  public constructor(
    repository: ProdutosRepository,
    objectMapper: ProdutoDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  /**
   *
   * Método que busca todos os produtos
   * cadastrados na aplicação.
   *
   * @returns Lista de produtos.
   */
  public async buscarTodos(): Promise<ProdutoDTO[]> {
    const produtos = await this.repository.buscarTodos();

    return await this.objectMapper.mapearListaOrigemParaListaDestino(produtos);
  }

  public async listarProdutos() {
      return this.repository.listarProdutos();
  }

  /**
   *
   * Método que busca os dados de um produto
   * a partir de um código ISBN.
   *
   * @param id Código do produto pesquisado.
   * @returns Dados do produto.
   */
  public async buscarProdutoPorId(id: string): Promise<ProdutoDTO> {
    const produto = await this.repository.buscarPorId(id);

    return await this.objectMapper.mapearOrigemParaDestino(produto);
  }

  /**
   *
   * Método que cadastra um novo produto.
   *
   * @param novoProduto Dados do novo produto.
   * @returns Registro do novo produto criado.
   */
  public async cadastrarNovoProduto(
    novoProduto: ProdutoParaCriarDTO
  ): Promise<ProdutoDTO> {
    const produto = new Produto({
        nome: novoProduto.nome,
        data_sa: novoProduto.data_sa,
        lider_npi: novoProduto.lider_npi,
        template_type: novoProduto.template_type,
        hr_json: novoProduto.hr_json,
    });
    console.log(`Service cadastrarNovoProduto: ${produto}`)
    const registro = await this.repository.salvar(produto);

    return await this.objectMapper.mapearOrigemParaDestino(registro);
  }

    /**
     *
     * Método que atualiza os dados de um produto.
     *
     * @param id Código ISBN do produto a ser atualizado.
     * @param dadosParaAtualizar Dados do produto para atualizar.
     * @returns Registro do produto atualizado.
     */
    public async atualizarProduto(
        id: string,
        dadosParaAtualizar: ProdutoParaAtualizarDTO
    ): Promise<ProdutoDTO> {
        const produto = await this.repository.buscarPorId(id);

        produto.set({
            nome: dadosParaAtualizar.nome,
            data_sa: dadosParaAtualizar.data_sa,
            lider_npi: dadosParaAtualizar.lider_npi,
            template_type: dadosParaAtualizar.template_type,
            hr_json: dadosParaAtualizar.hr_json,
        });
        console.log(`Service atualizarProduto nome: ${produto.nome}`)
        console.log(`Service atualizarProduto data_sa: ${produto.data_sa}`)
        console.log(`Service atualizarProduto lider_npi: ${produto.lider_npi}`)
        console.log(`Service atualizarProduto template_type: ${produto.template_type}`)
        console.log(`Service atualizarProduto hr_json: ${produto.hr_json}`)

        await this.repository.salvar(produto);

        return await this.objectMapper.mapearOrigemParaDestino(produto);
    }

    /**
     *
     * Método que apaga um produto a partir do
     * código ISBN.
     *
     * @param id Código ISBN do produto a ser apagado.
     * @returns Sucesso ou falha na operação.
     */
    public async deletarProduto(id: string): Promise<boolean> {
        const resultado = await this.repository.remover(id);

        return resultado === 1;
    }
}

export { ProdutosService };
