import { Component, OnInit } from '@angular/core';
import { LoginMenu } from "../../components/login-menu/login-menu.component";
import { NavigationBar } from "../../../shared/interfaces/components/navigationbar/navigationbar.component";

@Component({
    selector: 'login-page',
    templateUrl: 'login.component.html',
    imports: [LoginMenu, NavigationBar]
})

export default class LoginPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}