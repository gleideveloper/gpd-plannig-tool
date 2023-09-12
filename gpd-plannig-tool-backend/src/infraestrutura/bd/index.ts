import { Dotenv } from "@/common/Dotenv";
import { Logger } from "@/common/Logger";
import { Livro } from "@/dominio/modelos/Livro";

import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

Dotenv.carregarVariaveis();

/**
 *
 * Função que gera uma nova conexão com o
 * banco de dados através de uma instância
 * {@link Sequelize}.
 *
 * @returns Conexão com o banco de dados.
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
const gerarConexaoBDSequelize = async (): Promise<Sequelize> => {
  const logger = Logger.pegarInstancia();
  const {
    BD_DIALETO,
    BD_ENDERECO,
    BD_PORTA,
    BD_BANCODEDADOS,
    BD_USUARIO,
    BD_SENHA,
  } = process.env;
  const conexao = new Sequelize(
    BD_BANCODEDADOS as string,
    BD_USUARIO as string,
    BD_SENHA,
    {
      host: BD_ENDERECO,
      port: BD_PORTA as string as unknown as number,
      dialect: BD_DIALETO as Dialect,
      models: [Livro],
      logging: logger.info.bind(logger),
    }
  );

  return conexao;
};

export { gerarConexaoBDSequelize };
