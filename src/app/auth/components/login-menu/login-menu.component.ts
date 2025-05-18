import { Component, signal, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

/**
 * Componente login menu encargado de gestionar el formulario de inicio de sesión.
 * @author Carlos García Mora
 */
@Component({
    selector: 'login-menu',
    imports: [ReactiveFormsModule, RouterLink],
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

    /**
     * Método encargado de recoger los datos del formulario y
     * enviarlos al servicio de autenticación.
     * @author Carlos García Mora
     */
    onSubmit(){
        if (this.loginForm.invalid) {
            this.activateError();
            return;
        }

        const{ username = '', password = '' } = this.loginForm.value;

        this.authService.login(username!, password!).subscribe(isAuthenticated => {
            if (isAuthenticated) {

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

    /**
     * Método que activa la animación de error.
     * @author Carlos García Mora
     */
    activateError(){
        this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
    }
}
