import { Component, signal, OnInit, inject, effect } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../shared/services/movies.service';
import { Movie } from '../../../shared/interfaces/Movies/Movie';
import { AuthService } from '../../../auth/services/auth.service';

import Swal, { SweetAlertIcon } from 'sweetalert2';

/**
 * Componente encargado de mostrar los detalles de una película.
 * @author Carlos García Mora
 */
@Component({
  selector: 'movie-detail',
  templateUrl: 'movie-detail.component.html'
})

export default class MovieDetailPage implements OnInit {

  route = inject(ActivatedRoute);
  movieService = inject(MovieService);
  authService = inject(AuthService);
  router = inject(Router);

  movieId = signal<string>('');
  movie = signal<Movie>(null!);

  ngOnInit(): void {
    this.movieService.onMovieDetail.set(true);

    this.movieId.set(this.route.snapshot.paramMap.get('id')!);

    this.getMovieById();
    this.checkFavorite();
  }

  /**
   * Método encargado de verificar si la película
   * que se está mostrando es favorita para el usuario.
   * @returns
   */
  checkFavorite() : boolean {
    if (this.authService.authStatus() === 'not-authenticated') {
      console.error('No se puede verificar si la película es favorita, el usuario no está autenticado');
      return false;
    }

    var isFavorite = false;

    if(this.movieService.favoriteMovies()
      .some(movie => movie.id === Number(this.movieId()))){
      isFavorite = true;

    }
    return isFavorite;
  }

  /**
   * Método encargado de obtener la película por su id.
   * @author Carlos García Mora
   */
  getMovieById() {
    if(isNaN(Number(this.movieId()))){
      console.error('El id de la película no es un número válido');
      return;
    }

    this.movieService.getMovieById(Number(this.movieId()))
      .subscribe((res) => {
        // console.log(res);
        this.movie.set(res);
      });

  }

  /**
   * Método encargado de gestionar la acción de guardar una película como favorita.
   * @author Carlos García Mora
   */
  saveMovie(){

    if(this.authService.authStatus() === 'not-authenticated'){
      console.error('No se puede guardar la película, el usuario no está autenticado');
      return;
    }

    if(this.checkFavorite()){
      console.error('La película ya está guardada en favoritos');
      //Modal de error SweetAlert2
      this.showModal("Vaya...", 'Esta pelicula ya está guardada en favoritos', 'error', 'Aceptar');
      return;

    }

    const userId = this.authService.user()?.id;
    this.movieService.saveMovie(userId!, this.movie()).subscribe((res) => {
      console.log('Película guardada correctamente');
      this.showModal("Éxito!", 'Película guardada en tu lista de favoritos', 'success', 'Aceptar');
    });

  }

  /**
   * Método encargado de gestionar la acción de eliminar una película de favoritos.
   * @author Carlos García Mora
   *
   */
  deleteMovie(){
    if(this.authService.authStatus() === 'not-authenticated'){
      console.error('No se puede eliminar la película, el usuario no está autenticado');
      return;
    }

    const userId = this.authService.user()?.id;
    this.movieService.deleteMovie(userId!, this.movieId()).subscribe((res) => {
      console.log(res);

      this.showModal("Éxito!", 'Película eliminada de tu lista de favoritos', 'success', 'Aceptar');

      this.movieService.onMovieDetail.set(false);
      this.movieService.showingFavorites.set(false);

      this.router.navigate(['/home']);
    });

  }

  /**
   * Método encargado de mostrar un modal
   * @author Carlos García Mora
   * @param title Título del modal
   * @param text Texto del modal
   * @param icon Icono del modal
   * @param confirmButtonText Texto del botón de confirmar
   */
  showModal(titulo: string, texto: string, icono: SweetAlertIcon, textoBotonConfirmar: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      confirmButtonText: textoBotonConfirmar,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }
}
