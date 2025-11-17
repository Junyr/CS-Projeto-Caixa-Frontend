import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Produto} from '../../../model/produto';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-editar-produto',
  imports: [
    FormsModule,
    InputNumber,
    Button,
    InputTextModule
  ],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss'
})
export class EditarProdutoComponent {

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
