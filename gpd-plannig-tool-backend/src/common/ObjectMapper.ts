/**
 *
 * Interface de mapeamento de objetos de origem
 * para objetos de destino da aplicação. Todas
 * as classes de mapeamento de objetos devem
 * estender esta classe abstrata e implementar
 * o método de mapeamento.
 *
 * Convenção para nomear classes de mapeamento:
 * sugerimos colocar o nome da classe iniciando
 * com o nome da classe de objeto de destino,
 * finalizando com o sufixo **Mapper**.
 *
 * Exemplo: Para mapear objetos de {@link String}
 * para {@link Number}, o nome da classe pode
 * ser **NumberMapper**.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
abstract class ObjectMapper<K, V> {
  /**
   *
   * Método que mapeia uma lista de objetos de origem
   * {@link K} para uma lista de objetos de destino
   * {@link V}.
   *
   * @param {K[]} listaOrigem Lista de objetos de origem.
   * @return {V[]} Lista de objetos de destino mapeados.
   */
  public async mapearListaOrigemParaListaDestino(
    listaOrigem: K[]
  ): Promise<V[]> {
    const listaDestino: V[] = [];

    for (let origem of listaOrigem) {
      const destino = await this.mapearOrigemParaDestino(origem);
      listaDestino.push(destino);
    }

    return listaDestino;
  }

  /**
   *
   * Método que mapeia um objeto de origem
   * {@link K} para um objeto de destino
   * {@link V}.
   *
   * @param {K} origem Objeto de origem.
   * @return {V} Objeto de destino mapeado.
   */
  public abstract mapearOrigemParaDestino(origem: K): Promise<V>;
}

export { ObjectMapper };
