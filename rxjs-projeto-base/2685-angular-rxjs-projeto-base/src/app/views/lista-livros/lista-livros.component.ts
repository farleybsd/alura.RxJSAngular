import { FormControl } from '@angular/forms';
import { Item, LivrosResultado, VolumeInfo } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, catchError, debounceTime, filter, map, of, switchMap, throwError } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const Pausa = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: LivroVolumeInfo[];
  campobusca = new FormControl();
  subscription: Subscription;
  livro: Livro;
  mensagemErro = '';
  livrosResultado : LivrosResultado;

  constructor(private service: LivroService) { }
  totalDeLivros$ =this.campobusca
  .valueChanges
  .pipe(
   debounceTime(Pausa),
   filter((valorDigitado) => valorDigitado.length >= 3),
   switchMap((valorDigitado) =>this.service.buscar(valorDigitado)),
   map(resultado => this.livrosResultado = resultado),
   catchError(erro => {
    return of();
  })
  );

  livrosEncontrados$ = this.campobusca
                           .valueChanges
                           .pipe(
                            debounceTime(Pausa),
                            filter((valorDigitado) => valorDigitado.length >= 3),
                            switchMap((valorDigitado) =>this.service.buscar(valorDigitado)),
                            map(resultadoApi => resultadoApi.items ?? []),
                            map((items) =>this.listaLivros = this.livrosResultadoParaLivros(items)),
                            catchError(erro => {
                              return throwError(() => new Error(this.mensagemErro ='Ops, ocorreu um erro Recarregue a Pagina'))
                            })
                           );
  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campousca).subscribe({
  //     next: items => {
  //       this.listaLivros = this.livrosResultadoParaLivros(items);
  //     },
  //     error: error => {
  //       console.log(error);
  //     },
  //     complete: () => {
  //       console.log('Observable Completado');
  //     }
  //   });
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



