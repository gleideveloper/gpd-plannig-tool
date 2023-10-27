import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 *
 * Classe de modelo que define registros
 * de templates na tabela do banco de dados.
 *
 * @author Andre Xavier <xavier.andre256@gmail.com>
 */
@Table({
    tableName: "roles",
    timestamps: false,
})
class Role extends Model {
    @Column({
        field: "id",
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4(),
        primaryKey: true,
    })
    id!: string;

    @Column({
        field: "nome",
        type: DataType.STRING(20),
        allowNull: false,
    })
    nome!: string;

    @Column({
        field: "descricao",
        type: DataType.TEXT,
        allowNull: false,
    })
    descricao!: string;
}

export { Role };
