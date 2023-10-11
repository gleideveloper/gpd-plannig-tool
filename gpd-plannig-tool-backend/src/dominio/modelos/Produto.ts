import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Template} from "@/dominio/modelos/Template";


/**
 *
 * Classe de modelo que define um registro de um
 * livro na base de dados da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
@Table({
    tableName: "produtos",
    timestamps: false,
})
class Produto extends Model {
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
        field: "data_sa",
        type: DataType.DATE,
        allowNull: false,
    })
    data_sa!: Date;

    @Column({
        field: "lider_npi",
        type: DataType.STRING(20),
        allowNull: false,
    })
    lider_npi!: string;

    @ForeignKey(() => Template)
    @Column({
        field: "template_type",
        type: DataType.STRING(20), // Ou poderia ser DataType.INTEGER, dependendo da chave primária em Template.
        allowNull: false,
    })
    template_type!: string;

    @BelongsTo(() => Template, "template_type")
    template?: Template;
}

export { Produto };