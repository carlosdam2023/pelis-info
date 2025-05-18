import { Usuario } from "../Login/Usuario";

/**
 * Interfaz que representa la respuesta al realizar un registro.
 * @author Carlos García Mora
 */
export interface RegisterResponse {
    message: string;
    user:    Usuario;
}
