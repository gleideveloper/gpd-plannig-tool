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
        field: "role_name",
        type: DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    })
    role_name!: string;

    @Column({
        field: "description",
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string;
}

export { Role };
