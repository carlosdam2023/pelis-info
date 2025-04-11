import { Usuario } from "../Usuario";

export interface RegisterResponse {
    message: string;
    user:    Usuario;
}