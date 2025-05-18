import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from './shared/navigationbar/navigationbar.component';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pelis-info';

  authService = inject(AuthService);
}
