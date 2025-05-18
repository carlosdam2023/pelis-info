/**
 * Interfaz que representa una petición de registro de usuario.
 * @author Carlos García Mora
 */
export interface RegisterRequest {
    username: string;
    password: string;
    email:    string;
}
