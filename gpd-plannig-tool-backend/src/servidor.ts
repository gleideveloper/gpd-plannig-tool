import "reflect-metadata";

import { app } from "@/app";
import { Logger } from "@/common/Logger";
import { gerarConexaoBDSequelize } from "@/infraestrutura/bd";

import { createServer, Server } from "node:http";
import { templateInsertions } from "./insertions/templateInsertions";
import { insertRoles } from "./insertions/roleInsertions";
import {insertColaboradores} from "@/insertions/colabInsertions";

/**
 *
 * Função que inicializa os componentes necessários
 * para disponibilizar o servidor no ar.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
const iniciarAplicacao = async (): Promise<void> => {
  const logger: Logger = Logger.pegarInstancia();
  const porta: number = (process.env.PORTA || 3000) as number;
  const servidor: Server = createServer(app);

  try {
    const conexao = await gerarConexaoBDSequelize();
    await conexao.sync();

    //Povoar DB
    insertRoles();
    insertColaboradores();
    templateInsertions();

    servidor.listen(porta, () =>
      logger.info(`SERVIDOR RODANDO VIOLENTAMENTE NA PORTA ${porta}.`)
    );
  } catch (erro: any) {
    logger.error(erro);
    process.exit(1);
  }
};

void iniciarAplicacao();
