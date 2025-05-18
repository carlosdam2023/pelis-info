import { Component, computed, inject, input } from '@angular/core';
import { Movie } from '../../../shared/interfaces/Movies/Movie';
import { Genre } from '../../../shared/interfaces/Movies/Genre';
import { Router } from '@angular/router';
import { MovieService } from '../../../shared/services/movies.service';

/**
 * Componente MovieCard, tarjeta que muestra la información de una película.
 * @author Carlos García Mora
 */
@Component({
  selector: 'movie-card',
  imports: [],
  templateUrl: 'movie-card.component.html'
})

export class MovieCard {

  movieService = inject(MovieService);
  router = inject(Router);

  movie = input<Movie>()

  genres = computed(() => {
    return this.movie()?.genres.map((genre: Genre) => genre.name).join(', ');
  })

  /**
   * Método encargado de navegar a la página de detalle de la película.
   * @author Carlos García Mora
   * @param id Número de la película a la que se quiere navegar.
   */
  navigateDetail(id: number) {
    this.router.navigate(['/movie', id]);
  }

  /**
   * Método encargado de obtener la URL de la imagen de la película.
   * @author Carlos García Mora
   * @param path Ruta de la imagen de la película.
   * @returns URL de la imagen de la película o una imagen por defecto.
   */
  getPosterUrl(path: string | undefined): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}`: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg';
  }

}
