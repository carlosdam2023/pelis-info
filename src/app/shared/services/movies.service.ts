import { inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/Movies/Movie';
import { IdMovieResponse } from '../interfaces/Movies/IdMovieResponse';
import { AuthService } from '../../auth/services/auth.service';

const baseUrl = 'http://localhost:8080/movies';
const posterUrl = 'https://image.tmdb.org/t/p/w500';

/**
 * Servicio MovieService encargado de gestionar los endpoints de películas.
 * Este servicio se encarga de realizar las peticiones HTTP a la API de películas
 * y gestionar la información de las películas.
 * @author Carlos García Mora
 */
@Injectable({providedIn: 'root'})
export class MovieService {

  http = inject(HttpClient);
  authService = inject(AuthService);

  // Texto de búsqueda que se introduce en el input de búsqueda.
  querySearchBar = signal<string>('');

  // Signals que indican que se está mostrando en el momento.
  showingFavorites = signal<boolean>(false);
  showingSearched = signal<boolean>(false);
  onMovieDetail = signal<boolean>(false);

  // Signal que contiene la lista de películas que se están mostrando en el momento.
  showingMovies = signal<Movie[]>([]);

  // Signals que contienen las peliculas favoritas y populares y las de la última búsqueda.
  favoriteMovies = signal<Movie[]>([]);
  popularMovies = signal<Movie[]>([]);
  lastSearch = signal<Movie[]>([]);

  /**
   * Método encargado de obtener las películas populares desde la API.
   * @author Carlos García Mora
   * @returns Observable<Movie[]> que contiene la lista de películas populares.
   */
  getPopularMovies() : Observable<Movie[]>{
    return this.http.get<Movie[]>(`${baseUrl}/popular`);
  }

  /**
   * Método encargado de obtener peliculas mediante una query desde la API.
   * @author Carlos García Mora
   * @returns Observable<Movie[]> que contiene la lista de películas que coinciden.
   */
  getMoviesByQuery(query: string) : Observable<Movie[]>{
    return this.http.get<Movie[]>(`${baseUrl}/search/${query}`);
  }

  /**
   * Método encargado de obtener una película por su ID desde la API.
   * @author Carlos García Mora
   * @param id ID de la película a buscar.
   * @returns Observable<Movie> que contiene la película encontrada.
   */
  getMovieById(id: number) : Observable<Movie>{
    return this.http.get<IdMovieResponse>(`${baseUrl}/search/id/${id}`)
    .pipe(
      map((response) => {
        return response.movie;
      })
    );
  }

  /**
   * Método encargado de obtener las películas favoritas del usuario activo.
   * @author Carlos García Mora
   * @returns Observable<Movie[]> que contiene la lista de películas favoritas.
   */
  getFavoriteMovies() : Observable<Movie[]>{
    return this.http.get<Movie[]>(`${baseUrl}/favorite/${this.authService.user()?.id}`)
  }

  /**
   * Método encargado de guardar una película como favorita del usuario activo.
   * @author Carlos García Mora
   * @param userId ID del usuario al que se le va a guardar la película.
   * @param movie Película a guardar como favorita.
   * @returns Observable<any> que contiene la respuesta del servidor.
   */
  saveMovie(userId: number, movie: Movie){
    return this.http.post(`${baseUrl}/save`, {userId, movie});
  }

  /**
   * Método encargado de eliminar una película de la lista de favoritas del usuario activo.
   * @author Carlos García Mora
   * @param userId ID del usuario al que se le va a eliminar la película.
   * @param movieId ID de la película a eliminar de la lista de favoritas.
   * @returns Observable<any> que contiene la respuesta del servidor.
   */
  deleteMovie(userId: number, movieId: string){
    return this.http.delete(`${baseUrl}/favorites/delete/${userId}/${movieId}`);
  }

  /**
   * Devuelve la URL base de las imágenes de las películas.
   * @author Carlos García Mora
   * @returns Devuelve la URL base de las imágenes de las películas.
   */
  getPosterUrl(){
    return posterUrl;
  }

  /**
   * Método que establece la query de búsqueda en el input de búsqueda.
   * @author Carlos García Mora
   * @param query
   */
  setQuery(query: string){
    this.querySearchBar.set(query);
  }

  /**
   * Método que devuelve la query de búsqueda en el input de búsqueda.
   * @author Carlos García Mora
   * @returns Devuelve la query de búsqueda en el input de búsqueda.
   */
  getQuery(){
    return this.querySearchBar();
  }

}
