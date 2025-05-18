import { Genre } from './Genre';

/**
 * Interfaz que representa una película.
 * @author Carlos García Mora
 */
export interface Movie {
  adult:             boolean;
  id:                number;
  genres:            Genre[];
  overview:          string;
  popularity:        number;
  title:             string;
  video:             boolean;
  backdrop_path:     string;
  original_language: string;
  original_title:    string;
  poster_path:       string;
  release_date:      Date;
  vote_average:      number;
  vote_count:        number;
}
