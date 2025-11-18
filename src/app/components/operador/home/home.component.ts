import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Toolbar} from 'primeng/toolbar';
import {Produto} from '../../../model/produto';
import {CurrencyPipe, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {VendaService} from '../../../service/venda.service';
import {AuthService} from '../../../service/auth.service';
import {Venda} from '../../../model/vendaProdutos';
import {ProdutosService} from '../../../service/produtos.service';

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

export class HomeComponent implements OnInit {

  protected usuarioLogado: string = '';

  protected produtos: Produto[] = [];

  protected produtosSelecionados: Produto[] = [];

  constructor(
    private router: Router,
    private vendasService: VendaService,
    private authService: AuthService,
    private produtoService: ProdutosService
  ) {
    this.authService.usuarioInfo$.subscribe(u => {
      this.usuarioLogado = u?.nome ?? '';
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.produtos = this.produtoService.getProdutos();
    }
  }

  protected abrirRelatorios() {
    this.router.navigate(['relatorio']);
  }

  protected calcularTotal() {
    return this.produtosSelecionados.reduce((total, produto) => {
      const qtd = produto.quantidadeSelecionada ?? 0;
      return total + (produto.preco * qtd);
    }, 0);
  }

  protected registrarVenda() {

    const quantidadeItens = this.produtosSelecionados
      .reduce((acc, p) => acc + (p.quantidadeSelecionada ?? 0), 0);

    const total = this.produtosSelecionados
      .reduce((acc, p) => acc + (p.preco * (p.quantidadeSelecionada ?? 0)), 0);

    this.produtosSelecionados.forEach(p => {
      if (p.quantidadeSelecionada && p.quantidadeSelecionada > 0) {
        this.produtoService.alterarQuantidade(p.codigo, -(p.quantidadeSelecionada ?? 0));
      }
    });

    const venda: Venda = {
      codigo: Math.floor(Math.random() * 90000) + 10000,
      usuario: this.usuarioLogado ?? 'Desconhecido',
      data: new Date(),
      total,
    };

    this.vendasService.registrarVenda(venda);

    alert('Venda registrada com sucesso!');

    this.produtosSelecionados = [];
    this.produtos.forEach(p => p.quantidadeSelecionada = 0);
    this.produtos = this.produtoService.getProdutos();
  }

  protected quandoSelecionar(event: any) {
    const produto = event.data;

    if (!produto.quantidadeSelecionada || produto.quantidadeSelecionada < 1) {
      produto.quantidadeSelecionada = 1;
    }
  }

  protected quandoDesselecionar(event: any) {
      const produto = event.data;

      produto.quantidadeSelecionada = null;
    }
}
