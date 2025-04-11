import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { inject, signal } from '@angular/core';
import { Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

enum ErrorMessages { NotEnoughData, PasswordsDontMatch, EmailInvalid, None }

const errorTypes = {
    'NotEnoughData' : 'Faltan datos o no se han completado todos los campos',
    'PasswordsDontMatch' : 'Las contraseñas no coinciden', 
    'EmailInvalid' : 'Email inválido', 
    'ServerError' : 'Fallo interno del servidor de datos'
};

@Component({
    selector: 'register-menu',
    imports:[ReactiveFormsModule],
    templateUrl: 'register-menu.component.html'
})

export class RegisterMenu {
    fb = inject(FormBuilder);
    hasError = signal(false);

    errorMessage = signal<String>('');
    isPosting = signal(false);

    registerForm = this.fb.group({
        username: [''],
        password: [''],
        passwordConfirm: [''],
        email: ['', Validators.required, Validators.email],
    });

    authService = inject(AuthService);
    router = inject(Router);

    onSubmit(){
        console.log(this.errorMessage())
        const{ username = '', password = '' , email = '', passwordConfirm = ''} = this.registerForm.value;
        console.log(username, password, email, passwordConfirm);

        if(!username || !password || !email || !passwordConfirm ) {
            console.log('Faltan datos!');
            this.errorMessage.set(errorTypes['NotEnoughData']);
            this.activateError();
            return;
        }

        if(!this.validateEmail(email)) {
            console.log('Email inválido!');
            this.errorMessage.set(errorTypes['EmailInvalid']);
            this.activateError();
            return;
        }

        if(password !== passwordConfirm) {
            console.log('Las contraseñas no coinciden!');
            this.errorMessage.set(errorTypes['PasswordsDontMatch']);
            this.activateError();
            return;
        }

        this.authService.register({username, password, email}).subscribe(registered => {
            if (registered) {
                this.router.navigate(['/login']);
                console.log('Registro exitoso!');
                this.isPosting.set(false);
                this.hasError.set(false);
            } else {
                console.log('Register fallido!');
                this.errorMessage.set(errorTypes['ServerError']);
                this.activateError();
            }
        });
    }

    /**
     * Función para validar el formato de un email
     * @param email Email a validar
     * @returns Booleano que indica si el email es válido o no
     */
    validateEmail(email: string) : boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    activateError(){
        this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 10000);
    }

}