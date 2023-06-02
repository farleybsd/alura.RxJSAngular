import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly Api = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string) : Observable<LivrosResultado>{
    const params = new HttpParams().append('q',valorDigitado);
    return this.http.get<LivrosResultado>(this.Api,{params})
    // .pipe(
    //   tap((retornoApi) =>{
    //     console.log('Fluxo Tap',retornoApi)
    //   }),    //debug tap
    //   map(resultado => resultado.items ?? []),
    //   tap(resultado => console.log('Fluxo Apos o Map',resultado))
    // )
  }
}
