import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor que se encarga de añadir el token de autenticación a las peticiones HTTP.
 * @author Carlos García Mora
 */
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    const token = inject(AuthService).token();

    console.log("Se ha interceptado la petición");

    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    })

    return next(newReq);
  }
