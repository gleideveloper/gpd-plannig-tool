import { Usuario } from "../modelos/Usuario";
import { BaseRepository } from "./BaseRepository";

export interface UsuariosRepository extends BaseRepository<Usuario, string>{}
