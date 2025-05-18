import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

import { MovieCard } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../../shared/services/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

/**
 * Componente encargado de mostrar la página principal de la aplicación.
 * @author Carlos García Mora
 */
@Component({
    selector: 'HomePage',
    imports: [RouterLink, MovieCard],
    templateUrl: 'home-page.component.html'
})

export default class HomePage implements OnInit {

  authService = inject(AuthService);
  movieService = inject(MovieService);

  showFavorites = effect(() => {
    if(this.movieService.showingFavorites()){

      this.movieService.showingMovies.set(this.movieService.favoriteMovies());

    }else{

      this.movieService.showingMovies.set(this.movieService.popularMovies());

    }
  });

  getUserFavorites = effect(() => {
    if(this.authService.user()){
      this.getUserFavoriteMovies();
    }
  });


  movieResource = rxResource({
    request: () => ({query: this.movieService.getQuery()}),
    loader: ({ request }) => {

      if(!request.query) return of([])

      return this.movieService.getMoviesByQuery(request.query)
  },
  })

  ngOnInit(): void {
    this.movieService.onMovieDetail.set(false);
    this.getPopularMovies();
    this.setShowingMovies();
  }

  /**
   * Método encargado de establecer las películas que se mostrarán en la página.
   * @author Carlos García Mora
   */
  setShowingMovies(){
    /*
      Si el estado de mostrando favoritos es true,
      se establece la lista de películas favoritas
      en la lista de películas que se muestran.
    */
    if(this.movieService.showingFavorites()){
      this.movieService.showingMovies.set(this.movieService.favoriteMovies());
    }else{
      this.movieService.showingMovies.set(this.movieService.popularMovies());
    }
  }

  /**
   * Método encargado de obtener las películas favoritas del usuario.
   * @author Carlos García Mora
   */
  getUserFavoriteMovies(){
    this.movieService.getFavoriteMovies()
    .subscribe((res) => {
      this.movieService.favoriteMovies.set(res);
    });
  }

  /**
   * Método encargado de obtener las películas populares.
   * @author Carlos García Mora
   */
  getPopularMovies() {
    this.movieService.getPopularMovies()
    .subscribe((res) => {
      this.movieService.popularMovies.set(res);
    });
  }


}
