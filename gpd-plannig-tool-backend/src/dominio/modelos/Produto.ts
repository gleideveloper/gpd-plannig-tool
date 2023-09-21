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
        validate: {
            len: {
                args: [1, 180],
                msg: "O nome do produto deve ter entre 10 e 180 caracteres.",
            },
        },
    })
    nome!: string;

    @Column({
        field: "data_sa",
        type: DataType.DATE, // Atualize o tipo para DataType.DATE
        allowNull: false,
        unique: true,
        validate: {
            isDate: true, // Adicione uma validação para garantir que seja uma data válida
            len: {
                args: [13, 13],
                msg: "A data deve ter 13 caracteres.",
            },
        },
    })
    data_sa!: Date;

    @Column({
        field: "lider_npi",
        type: DataType.STRING(20),
        allowNull: false,
        validate: {
            len: {
                args: [1, 20],
                msg: "A família deve ser formado por no máximo 50 caracteres.",
            },
        },
    })
    lider_npi!: string;

    @Column({
        field: "familia",
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [1, 50],
                msg: "A família deve ser formado por no máximo 50 caracteres.",
            },
        },
    })
    familia!: string;

    @Column({
        field: "chipset",
        type: DataType.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [1, 20],
                msg: "O chipset deve ser formado por no máximo 50 caracteres.",
            },
        },
    })
    chipset!: string;

    @Column({
        field: "escopo",
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [1, 50],
                msg: "A família deve ser formado por no máximo 50 caracteres.",
            },
        },
    })
    escopo!: string;

    @Column({
        field: "network_band",
        type: DataType.STRING(5),
        allowNull: false,
        validate: {
            len: {
                args: [1, 5],
                msg: "A família deve ser formado por no máximo 5 caracteres.",
            },
        },
    })
    network_band!: string;

    @Column({
        field: "odm",
        type: DataType.BOOLEAN,
        allowNull: false,
        validate: {
            isBoolean: true,
        },
    })
    odm!: boolean;

    @Column({
        field: "operadora",
        type: DataType.STRING(5),
        allowNull: false,
        validate: {
            len: {
                args: [1, 5],
                msg: "A operadora deve ser formado por no máximo 5 caracteres.",
            },
        },
    })
    operadora!: string;
}

export {Produto};
