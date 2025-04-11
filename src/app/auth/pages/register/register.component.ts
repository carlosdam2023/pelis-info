import { Component } from '@angular/core';
import { RegisterMenu } from "../../components/register-menu/register-menu.component";

@Component({
    selector: 'register-page',
    templateUrl: 'register.component.html',
    imports: [RegisterMenu]
})

export default class RegisterPage{
    constructor() { }
}