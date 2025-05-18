import { Component, OnInit } from '@angular/core';
import { LoginMenu } from "../../components/login-menu/login-menu.component";

/**
 * Componente LoginPage encargado de gestionar la vista de inicio de sesión.
 * @author Carlos García Mora
 */
@Component({
    selector: 'login-page',
    templateUrl: 'login.component.html',
    imports: [LoginMenu]
})


export default class LoginPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}
