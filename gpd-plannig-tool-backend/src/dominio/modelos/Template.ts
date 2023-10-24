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
        field: "template_type",
        type: DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    })
    template_type!: string;

    @Column({
        field: "sa_idx",
        type: DataType.BIGINT(),
        allowNull: false,
    })
    sa_idx!: number;

    @Column({
        field: "peak_ammount",
        type: DataType.TEXT,
        allowNull: false,
    })
    peak_ammount!: string;

    @Column({
        field: "length",
        type: DataType.INTEGER,
        allowNull: false,
    })
    length!: number;
}

export { Template };
