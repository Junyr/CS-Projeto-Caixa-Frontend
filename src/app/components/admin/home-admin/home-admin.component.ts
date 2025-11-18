import { Component, OnInit } from '@angular/core';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
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

  protected produtos: Produto[] = [];

  protected modoExclusao: boolean = false;
  protected produtosSelecionados: Produto | Produto[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.produtos = this.produtoService.getProdutos();
    }
  }

  protected abrirRelatorios() {
    this.router.navigate(['relatorio']);
  }

  protected alterarInformacoes(produto: Produto) {
    this.router.navigate(['admin/editarProduto', produto.codigo]);
  }

  protected entrarModoExclusao() {
    this.modoExclusao = !this.modoExclusao;
    this.produtosSelecionados = [];
  }

  protected excluirSelecionados(selecionados: Produto | Produto[]) {
    if (!selecionados) return;

    let codigos: number[];

    if (Array.isArray(selecionados)) {
      codigos = selecionados.map(p => p.codigo);
    } else {
      codigos = [selecionados.codigo];
    }

    this.produtoService.removerProdutos(codigos);

    this.produtos = this.produtoService.getProdutos();

    this.modoExclusao = false;
    this.produtosSelecionados = [];
  }

  protected readonly Array = Array;

  protected novo() {
    this.router.navigate(['admin/novoProduto']);
  }

  protected usuarios() {
    this.router.navigate(['admin/usuarios']);
  }
}
