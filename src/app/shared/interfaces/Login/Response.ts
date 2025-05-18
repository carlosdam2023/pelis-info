import { Usuario } from './Usuario';

/**
 * Interfaz que representa la respuesta de inicio de sesión.
 * @author Carlos García Mora
 */
export interface Response {
    token:   string;
    usuario: Usuario;
}
