import { Injectable, signal, inject, computed,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { rxResource } from '@angular/core/rxjs-interop';


import { Usuario } from '../../shared/interfaces/Login/Usuario';
import { LoginResponse } from '../../shared/interfaces/Login/LoginResponse';
import { RegisterRequest } from '../../shared/interfaces/Register/RegisterRequest';
import { RegisterResponse } from '../../shared/interfaces/Register/RegisterResponse';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = 'http://localhost:8080/auth';


/**
 * Servicio AuthService encargado de gestionar la autenticación del usuario.
 * @author Carlos García Mora
 */
@Injectable({providedIn: 'root'})
export class AuthService {

    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal <Usuario | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));

    authStatus = computed(() => {
        if(this._authStatus() === 'checking') return 'checking';

        if(this._user()){
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    user = computed(() => this._user());
    token = computed(() => this._token());

    http = inject(HttpClient);

    checkStatusResoruce = rxResource({
        loader: () => this.checkStatus(),
    });

    /**
     * Método encargado de iniciar sesión en la aplicación.
     * @param username String que representa el nombre de usuario.
     * @param password String que representa la contraseña del usuario.
     * @author Carlos García Mora
     * @returns observable<boolean> que indica si el inicio de sesión fue exitoso o no.
     */
    login(username: string, password: string) : Observable<boolean> {
        return this.http.post<LoginResponse>(`${baseUrl}/login`, {
            username,
            password
        }).pipe(
            tap(res => { this.handleLoginSuccess(res) }),
            map(() => true),
            catchError((error: any) => this.handleAuthError(error) ),
        );
    }

    /**
     * Método encargado de registrar un nuevo usuario.
     * @param req Objeto que contiene los datos del nuevo usuario.
     * @author Carlos García Mora
     * @returns Observable<boolean> que indica si el registro fue exitoso o no.
     */
    register(req: RegisterRequest) : Observable<boolean> {
        const { username = '', password = '', email = '' } = req;

        return this.http.post<RegisterResponse>(`${baseUrl}/register`, {
            username,
            password,
            email
        }).pipe(
            map(() => true),
        );
    }

    /**
     * Método encargado de verificar el estado de autenticación del usuario.
     * Si el token es válido, se actualiza el estado de autenticación y el usuario.
     * @author Carlos García Mora
     * @returns Observable<boolean> que indica si el usuario está autenticado o no.
     */
    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem('token') || '';

        if(!token) {
            this.logout();
            return of(false);
        }

        return this.http.get<Usuario>(`${baseUrl}/renew`).pipe(
            tap(usuario => {
                this._authStatus.set('authenticated');
                this._user.set(usuario);
                this._token.set(token);
            }),
            map(() => true),
            catchError((error: any) => {
                console.log('Error en la verificación del token:', error);
                return this.handleAuthError(error)} ),
        )
    }

    /**
     * Método encargado de cerrar la sesión del usuario.
     * Se actualiza el estado de autenticación y se elimina el token del almacenamiento local.
     * @author Carlos García Mora
     */
    logout(){
        console.log('Logout!');

        this._authStatus.set('not-authenticated');
        this._user.set(null);
        this._token.set(null);

        localStorage.removeItem('token');
    }

    /**
     * Método encargado de manejar la respuesta de inicio de sesión exitoso.
     * Se actualiza el estado de autenticación, el usuario y el token.
     * @param res Respuesta del back con los datos del usuario y su token.
     * @author Carlos García Mora
     */
    private handleLoginSuccess(res: LoginResponse){
        const{ usuario, token } = res.response;

        this._authStatus.set('authenticated');
        this._user.set(usuario);
        this._token.set(token);

        localStorage.setItem('token', token);
    }

    /**
     * Método encargado de manejar el error de autenticación.
     * @param error Error de autenticación.
     * @author Carlos García Mora
     * @returns Observable<boolean> que indica si el usuario está autenticado o no.
     */
    private handleAuthError(error: any){
        this.logout();
        return of(false);
    }
}
