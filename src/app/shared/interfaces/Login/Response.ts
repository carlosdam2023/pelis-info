import { Usuario } from '../Usuario';

export interface Response {
    token:   string;
    usuario: Usuario;
}