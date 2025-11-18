import { Component, OnInit } from '@angular/core';
import {Button} from 'primeng/button';
import {CurrencyPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Toolbar} from 'primeng/toolbar';
import {Router} from '@angular/router';
import {Produto} from '../../../model/produto';
import {ProdutosService} from '../../../service/produtos.service';

@Component({
  selector: 'app-home-admin',
  imports: [
    Button,
    FormsModule,
    NgIf,
    PrimeTemplate,
    TableModule,
    Toolbar
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent implements OnInit {

  constructor(private router: Router, private produtoService: ProdutosService) {
  }

  protected usuarioLogado: string = '';

  protected produtos: Produto[] = [];

  protected modoExclusao: boolean = false;
  protected produtosSelecionados: Produto | Produto[] = [];

  ngOnInit(): void {
    this.produtos = this.produtoService.getProdutos();
  }

  protected adicionarItem() {

  }

  protected abrirEstoque() {

  }

  protected abrirRelatorios() {
    this.router.navigate(['relatorio']);
  }

  protected logout() {

  }

  protected alterarInformacoes() {
    this.router.navigate(['admin/editarProduto']);
  }

  protected entrarModoExclusao() {
    this.modoExclusao = !this.modoExclusao;
    this.produtosSelecionados = [];
  }

  protected excluirSelecionados() {

  }

  protected readonly Array = Array;

  protected novo() {
    this.router.navigate(['admin/novoProduto']);
  }

  protected usuarios() {
    this.router.navigate(['admin/usuarios']);
  }
}
