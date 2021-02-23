import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators'
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'd1f718df197ee42df78bcf97d331e205',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPAge() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    )
  }

  buscarPeliculas(query: string): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query };

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    )
  }

  getPeliculaDetalle(id: string): Observable<MovieResponse> {

    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    );

  }
  getCast(id: string): Observable<Cast[]> {

    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([]))
    );
  }

}
