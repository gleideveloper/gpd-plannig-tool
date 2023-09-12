import { LivroDTO } from "../dto/LivroDTO";
import { LivroParaAtualizarDTO } from "../dto/LivroParaAtualizarDTO";
import { LivroParaCriarDTO } from "../dto/LivroParaCriarDTO";
import { Livro } from "../modelos/Livro";
import { LivroDTOMapper } from "../objectmapper/LivroDTOMapper";
import { LivrosRepository } from "../repositorios/LivrosRepository";

/**
 *
 * Classe de serviço que executa as regras de
 * negócio de livros na aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
class LivrosService {
  /**
   *
   * Instância de um repositório de livros.
   */
  private repository: LivrosRepository;

  /**
   *
   * Instância de um mapeador de objetos.
   */
  private objectMapper: LivroDTOMapper;

  /**
   *
   * Recebemos as dependências da classe
   * pelo construtor, implementando o padrão
   * de projetos Injeção de Dependências.
   *
   * @param repository Instância de um repositório de livros.
   * @param objectMapper Instância de um mapeador de objetos.
   */
  public constructor(
    repository: LivrosRepository,
    objectMapper: LivroDTOMapper
  ) {
    this.repository = repository;
    this.objectMapper = objectMapper;
  }

  /**
   *
   * Método que busca todos os livros
   * cadastrados na aplicação.
   *
   * @returns Lista de livros.
   */
  public async buscarTodos(): Promise<LivroDTO[]> {
    const livros = await this.repository.buscarTodos();

    return await this.objectMapper.mapearListaOrigemParaListaDestino(livros);
  }

  /**
   *
   * Método que busca os dados de um livro
   * a partir de um código ISBN.
   *
   * @param isbn Código ISBN do livro pesquisado.
   * @returns Dados do livro.
   */
  public async buscarLivroPorIsbn(isbn: string): Promise<LivroDTO> {
    const livro = await this.repository.buscarPorIsbn(isbn);

    return await this.objectMapper.mapearOrigemParaDestino(livro);
  }

  /**
   *
   * Método que cadastra um novo livro.
   *
   * @param novoLivro Dados do novo livro.
   * @returns Registro do novo livro criado.
   */
  public async cadastrarNovoLivro(
    novoLivro: LivroParaCriarDTO
  ): Promise<LivroDTO> {
    const livro = new Livro({
      nome: novoLivro.nome,
      sinopse: novoLivro.sinopse,
      isbn: novoLivro.isbn,
      urlImagem: novoLivro.urlImagem,
      autores: novoLivro.autores,
    });
    const registro = await this.repository.salvar(livro);

    return await this.objectMapper.mapearOrigemParaDestino(registro);
  }

  /**
   *
   * Método que atualiza os dados de um livro.
   *
   * @param isbn Código ISBN do livro a ser atualizado.
   * @param dadosParaAtualizar Dados do livro para atualizar.
   * @returns Registro do livro atualizado.
   */
  public async atualizarLivro(
    isbn: string,
    dadosParaAtualizar: LivroParaAtualizarDTO
  ): Promise<LivroDTO> {
    const livro = await this.repository.buscarPorIsbn(isbn);

    livro.set({
      nome: dadosParaAtualizar.nome,
      sinopse: dadosParaAtualizar.sinopse,
      autores: dadosParaAtualizar.autores,
      urlImagem: dadosParaAtualizar.urlImagem,
    });
    await this.repository.salvar(livro);

    return await this.objectMapper.mapearOrigemParaDestino(livro);
  }

  /**
   *
   * Método que apaga um livro a partir do
   * código ISBN.
   *
   * @param isbn Código ISBN do livro a ser apagado.
   * @returns Sucesso ou falha na operação.
   */
  public async deletarLivro(isbn: string): Promise<boolean> {
    const livro = await this.repository.buscarPorIsbn(isbn);
    const resultado = await this.repository.remover(livro.id as string);

    return resultado === 1;
  }
}

export { LivrosService };
