import { inject } from '@angular/core';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';


/**
 * Guard que se encarga de verificar si el usuario no está autenticado.
 * Si el usuario está autenticado, redirige a la página de inicio.
 * @author Carlos García Mora
 */
export const NotAuthenticatedGuard: CanMatchFn = async(
  route: Route,
  segments: UrlSegment[]
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom( authService.checkStatus());
  console.log(isAuthenticated);

  if(isAuthenticated){
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
