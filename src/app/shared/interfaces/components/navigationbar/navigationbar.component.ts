import { Component, computed, input, signal, inject, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../../Usuario';
import { AuthService } from '../../../../auth/services/auth.service';


@Component({
    selector: 'navigation-bar',
    imports: [],
    templateUrl: 'navigationbar.component.html'
})

export class NavigationBar{

    authService = inject(AuthService);
    router = inject(Router);

    animation = input('animate__animated animate__backInDown')
}