import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Toolbar} from 'primeng/toolbar';
import {Produto} from '../../../model/produto';
import {CurrencyPipe, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    TableModule,
    DropdownModule,
    FormsModule,
    Toolbar,
    Button,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(private router: Router) {
  }

  protected usuarioLogado: string = '';

  protected produtos: Produto[] = [
    {
      codigo: 101,
      nome: 'Arroz Tipo 1 5kg',
      categoria: 'Alimentos',
      quantidade: 20,
      preco: 22.90
    },
    {
      codigo: 102,
      nome: 'Feijão Carioca 1kg',
      categoria: 'Alimentos',
      quantidade: 15,
      preco: 8.50
    },
    {
      codigo: 103,
      nome: 'Macarrão Espaguete 500g',
      categoria: 'Massas',
      quantidade: 40,
      preco: 5.20
    },
    {
      codigo: 104,
      nome: 'Óleo de Soja 900ml',
      categoria: 'Alimentos',
      quantidade: 30,
      preco: 6.90
    },
    {
      codigo: 105,
      nome: 'Açúcar Refinado 1kg',
      categoria: 'Alimentos',
      quantidade: 25,
      preco: 4.30
    },
    {
      codigo: 201,
      nome: 'Detergente Neutro 500ml',
      categoria: 'Limpeza',
      quantidade: 50,
      preco: 2.49
    },
    {
      codigo: 202,
      nome: 'Sabão em Pó 1kg',
      categoria: 'Limpeza',
      quantidade: 20,
      preco: 12.90
    },
    {
      codigo: 203,
      nome: 'Amaciante 2L',
      categoria: 'Limpeza',
      quantidade: 18,
      preco: 14.50
    },
    {
      codigo: 301,
      nome: 'Refrigerante Cola 2L',
      categoria: 'Bebidas',
      quantidade: 35,
      preco: 9.99
    },
    {
      codigo: 302,
      nome: 'Água Mineral 1.5L',
      categoria: 'Bebidas',
      quantidade: 60,
      preco: 2.50
    }
  ];

  protected produtosSelecionados: Produto[] = [];

  protected adicionarItem() {

  }

  protected abrirEstoque() {

  }

  protected abrirRelatorios() {
    this.router.navigate(['relatorio']);
  }

  protected logout() {

  }

  protected calcularTotal() {
    return this.produtosSelecionados.reduce((total, produto) => {
      const qtd = produto.quantidadeSelecionada ?? 0;
      return total + (produto.preco * qtd);
    }, 0);
  }



  protected registrarVenda() {

  }

  protected quandoSelecionar(event: any) {
    const produto = event.data;

    // Se a quantidade não estiver definida, define como 1
    if (!produto.quantidadeSelecionada || produto.quantidadeSelecionada < 1) {
      produto.quantidadeSelecionada = 1;
    }
  }

  protected quandoDesselecionar(event: any) {
    const produto = event.data;

    // Opcional: limpar quantidade ao desmarcar
    produto.quantidadeSelecionada = null;
  }

}
