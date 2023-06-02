import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campousca: string = '';
  subscription: Subscription;

  constructor(private service: LivroService) { }

  buscarLivros() 
  {
    this.subscription = this.service.buscar(this.campousca).subscribe({
      next: retornoApi => {
        console.log(retornoApi);
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Observable Completado');
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



