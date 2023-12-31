import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "@/dominio/modelos/Role";

/**
 *
 * Classe de modelo que define um registro de um
 * livro na base de dados da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
@Table({
    tableName: "colaboradores",
    timestamps: false,
})
class Colaborador extends Model {
    @Column({
        field: "id",
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4(),
        primaryKey: true,
    })
    id!: string;

    @Column({
        field: "nome",
        type: DataType.STRING(180),
        allowNull: false,
    })
    nome!: string;

    @Column({
        field: "departamento",
        type: DataType.STRING(20),
        allowNull: false,
    })
    departamento!: string;

    @ForeignKey(() => Role)
    @Column({
        field: "role_name",
        type: DataType.STRING(20),
        allowNull: false,
    })
    role_name!: string;

    @BelongsTo(() => Role, "role_name")
    role?: Role;
}

export { Colaborador };