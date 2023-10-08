import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 *
 * Classe de modelo que define registros
 * de templates na tabela do banco de dados.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
@Table({
  tableName: "templates",
  timestamps: false,
})
class Template extends Model {
  @Column({
    field: "id",
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
    primaryKey: true,
  })
  id?: string;

  @Column({
    field: "tipo",
    type: DataType.STRING(80),
    allowNull: false,
  })
  tipo!: string;

  @Column({
    field: "sa_idx",
    type: DataType.BIGINT(),
    allowNull: false,
  })
  sa_idx!: number;

}

export { Template };
