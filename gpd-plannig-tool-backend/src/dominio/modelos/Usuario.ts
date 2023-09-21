import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "usuarios",
  timestamps: true,  // Assumindo que você queira timestamps (createdAt, updatedAt) para usuários.
})
class Usuario extends Model {
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
        args: [3, 180],
        msg: "O nome do usuário deve ter entre 3 e 180 caracteres.",
      },
    },
  })
  nome!: string;

  @Column({
    field: "email",
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "O e-mail fornecido não é válido.",
      },
    },
  })
  email!: string;

  @Column({
    field: "senha",
    type: DataType.STRING(255),  // Senha potencialmente hash
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "A senha não pode ficar em branco.",
      },
      notNull: {
        msg: "A senha não pode ser nula.",
      },
    },
  })
  senha!: string;

  @Column({
    field: "role",
    type: DataType.STRING(180),
    allowNull: false,
    validate: {
      len: {
        args: [1, 180],
        msg: "A role do usuário deve ter entre 3 e 180 caracteres.",
      },
    },
  })
  role!: string;
  
  @Column({
    field: "department",
    type: DataType.STRING(180),
    allowNull: false,
    validate: {
      len: {
        args: [1, 180],
        msg: "O departamento do usuário deve ter entre 3 e 180 caracteres.",
      },
    },
  })
  department!: string;

  @Column({
    field: "team",
    type: DataType.STRING(180),
    allowNull: false,
    validate: {
      len: {
        args: [1, 180],
        msg: "O time do usuário deve ter entre 3 e 180 caracteres.",
      },
    },
  })
  team!: string;

  // Outros campos

}

export { Usuario };

