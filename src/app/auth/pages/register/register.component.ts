import { Component } from '@angular/core';
import { RegisterMenu } from "../../components/register-menu/register-menu.component";

/**
 * Componente RegisterPage encargado de gestionar la vista de registro.
 * @author Carlos García Mora
 */
@Component({
    selector: 'register-page',
    templateUrl: 'register.component.html',
    imports: [RegisterMenu]
})

export default class RegisterPage{
    constructor() { }
}
