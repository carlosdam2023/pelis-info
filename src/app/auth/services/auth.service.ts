import { Injectable, signal, inject, computed,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { rxResource } from '@angular/core/rxjs-interop';


import { Usuario } from '../../shared/interfaces/Usuario';
import { LoginResponse } from '../../shared/interfaces/Login/LoginResponse';
import { RegisterRequest } from '../../shared/interfaces/Register/RegisterRequest';
import { RegisterResponse } from '../../shared/interfaces/Register/RegisterResponse';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = 'http://localhost:8080/auth';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal <Usuario | null>(null);
    private _token = signal<string | null>(null);

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

    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem('token') || '';

        if(!token) {
            this.logout();
            return of(false);
        }

        return this.http.get<Usuario>(`${baseUrl}/renew`, {
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        }).pipe(
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

    logout(){

        console.log('Logout!');

        this._authStatus.set('not-authenticated');
        this._user.set(null);
        this._token.set(null);

        // localStorage.removeItem('token');
    }

    private handleLoginSuccess(res: LoginResponse){

        const{ usuario, token } = res.response;

        this._authStatus.set('authenticated');
        this._user.set(usuario);
        this._token.set(token);

        localStorage.setItem('token', token);
    }

    private handleAuthError(error: any){
        this.logout();
        return of(false);
    }
}