import {Column, DataType, Model, Table} from "sequelize-typescript";

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
    id?: string;

    @Column({
        field: "nome",
        type: DataType.STRING(180),
        allowNull: false,
    })
    nome!: string;

    @Column({
        field: "data_sa",
        type: DataType.DATE, // Atualize o tipo para DataType.DATE
        allowNull: false,
    })
    data_sa!: Date;

    @Column({
        field: "lider_npi",
        type: DataType.STRING(20),
        allowNull: false,
    })
    lider_npi!: string;

    @Column({
        field: "familia",
        type: DataType.STRING(50),
        allowNull: false,
    })
    familia!: string;

    @Column({
        field: "chipset",
        type: DataType.STRING(20),
        allowNull: false,
    })
    chipset!: string;

    @Column({
        field: "escopo",
        type: DataType.STRING(50),
        allowNull: false,
    })
    escopo!: string;

    @Column({
        field: "network_band",
        type: DataType.STRING(5),
        allowNull: false,
    })
    network_band!: string;

    @Column({
        field: "odm",
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    odm!: boolean;

    @Column({
        field: "operadora",
        type: DataType.STRING(5),
        allowNull: false,
    })
    operadora!: string;
}

export {Produto};
