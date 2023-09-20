import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 *
 * Classe de modelo que define registros
 * de operadoras na tabela do banco de dados.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
@Table({
  tableName: "operadoras",
  timestamps: false,
})
class Operadora extends Model {
  @Column({
    field: "id",
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
    primaryKey: true,
  })
  id?: string;

  @Column({
    field: "nome",
    type: DataType.STRING(80),
    allowNull: false,
    validate: {
      len: {
        args: [2, 80],
        msg: "O nome do operadora deve ter entre 2 e 80 caracteres.",
      },
    },
  })
  nome!: string;

  @Column({
    field: "regiao",
    type: DataType.STRING(80),
    allowNull: false,
    validate: {
      len: {
        args: [2, 80],
        msg: "O nome do operadora deve ter entre 2 e 80 caracteres.",
      },
    },
  })
  regiao!: string;

}

export { Operadora };
