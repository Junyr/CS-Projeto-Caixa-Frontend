import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Router} from '@angular/router';
import {Produto} from '../../../model/produto';

@Component({
  selector: 'app-novo-produto',
  imports: [
    Button,
    FormsModule,
    InputNumber,
    InputText
  ],
  templateUrl: './novo-produto.component.html',
  styleUrl: './novo-produto.component.scss'
})
export class NovoProdutoComponent {

  constructor(private router: Router) { }

  produto: Produto = {
    categoria: '', codigo: 0, nome: '', preco: 0, quantidade: 0

  };

  salvar() {
    console.log('Produto salvo:', this.produto);
    this.router.navigate(['admin/home']);
  }

  cancelar() {
    this.router.navigate(['admin/home']);
  }

}
