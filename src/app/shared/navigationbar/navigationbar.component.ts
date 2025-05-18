import { Component, input, inject, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { MovieService } from '../services/movies.service';

/**
 * Componente NavigationBar encargado de mostrar la barra de navegación de la aplicación.
 * @author Carlos García Mora
 */
@Component({
    selector: 'navigation-bar',
    imports: [RouterLink],
    templateUrl: 'navigationbar.component.html'
})

export class NavigationBar{

    movieService = inject(MovieService);
    authService = inject(AuthService);
    router = inject(Router);

    query = signal<string>('');

    animation = input('animate__animated animate__backInDown')

    /**
     * Método llamado cuando se pulsa intro en el input de búsqueda.
     * @param query Cadena de texto que representa la consulta de búsqueda.
     * @author Carlos García Mora
     */
    onSearch(query: string){
        console.log(query);
        this.movieService.showingFavorites.set(false);
        this.movieService.setQuery(query);
    }

    /**
     * Método encargado de obtener las películas populares.
     * @author Carlos García Mora
     */
    showFavs(){
      this.movieService.showingFavorites.set(true);
      this.movieService.setQuery('');

      // Si estamos en la página de detalles de una película, redirigimos a la página principal
      // y mostramos las películas favoritas
      if(this.movieService.onMovieDetail()){
        this.router.navigate(['/home']);
        this.movieService.showingMovies.set(this.movieService.favoriteMovies());
      }
    }

    /**
     * Método encargado de cerrar y limpiar la sesión en la aplicación.
     * @author Carlos García Mora
     */
    logout(){
        this.authService.logout()
        this.movieService.showingFavorites.set(false);
        this.movieService.setQuery(null!);
        this.movieService.favoriteMovies.set([]);
        this.router.navigate(['/login']);
    }

    /**
     * Método encargado de gestionar variables de estado
     * al pulsar el botón de inicio.
     * @author Carlos García Mora
     */
    homeClick(){
      this.movieService.showingFavorites.set(false);
      this.movieService.onMovieDetail.set(false);
      this.movieService.setQuery(null!);
    }
}
