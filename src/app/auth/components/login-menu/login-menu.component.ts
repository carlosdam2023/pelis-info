import { Component, signal, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

import { RouterLinkActive } from '@angular/router';


@Component({
    selector: 'login-menu',
    imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
    templateUrl: 'login-menu.component.html'
})

export class LoginMenu {
    
    fb = inject(FormBuilder);
    hasError = signal(false);
    isPosting = signal(false);

    loginForm = this.fb.group({
        username: [''],
        password: ['']
    });

    animation = input('animate__animated animate__backInUp')

    authService = inject(AuthService);
    router = inject(Router);

    onSubmit(){
        if (this.loginForm.invalid) {
            this.activateError();
            return;
        }

        const{ username = '', password = '' } = this.loginForm.value;

        console.log(username, password);

        this.authService.login(username!, password!).subscribe(isAuthenticated => {
            if (isAuthenticated) {
                //TODO : Redirigir a la página de inicio o a la página deseada después del inicio de sesión exitoso

                console.log('Login exitoso!');
                this.isPosting.set(false);
                this.hasError.set(false);

                this.router.navigate(['/home']);
            } else {
                console.log('Login fallido!');
                this.activateError();
            }
        });
    }

    activateError(){
        this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
    }
}