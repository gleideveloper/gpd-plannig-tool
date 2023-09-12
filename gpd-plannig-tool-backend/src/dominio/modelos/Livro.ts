import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 *
 * Classe de modelo que define um registro de um
 * livro na base de dados da aplicação.
 *
 * @author Gleides Vinente <gleidevelop@gmail.com>
 */
@Table({
  tableName: "livros",
  timestamps: false,
})
class Livro extends Model {
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
        args: [20, 180],
        msg: "O nome do livro deve ter entre 20 e 180 caracteres.",
      },
    },
  })
  nome!: string;

  @Column({
    field: "sinopse",
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "A sinopse não pode ficar em branco.",
      },
      notNull: {
        msg: "A sinopse não pode ser nula.",
      },
    },
  })
  sinopse!: string;

  @Column({
    field: "isbn",
    type: DataType.STRING(13),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [13, 13],
        msg: "O código ISBN deve ser formado por 13 caracteres.",
      },
    },
  })
  isbn!: string;

  @Column({
    field: "url_imagem",
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: {
        msg: "A URL da imagem deve ser uma URL válida.",
      },
    },
  })
  urlImagem!: string;

  @Column({
    field: "autores",
    type: DataType.ARRAY(DataType.STRING(180)),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O livro deve ter pelo menos um autor.",
      },
      notNull: {
        msg: "O livro deve ter pelo menos um autor.",
      },
    },
  })
  autores!: string[];
}

export { Livro };
