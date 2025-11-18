import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private STORAGE_KEY = 'produtos';

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!localStorage;
  }

  getProdutos(): Produto[] {
    if (!this.isBrowser()) return [];

    const data = localStorage.getItem(this.STORAGE_KEY);
    const produtos = data ? JSON.parse(data) : [];

    return produtos.map((p: any) => ({
      ...p,
      codigo: Number(p.codigo),       // 🔥 força para number
      preco: Number(p.preco),         // se quiser corrigir tudo
      quantidade: Number(p.quantidade)
    }));
  }

  private salvarProdutos(produtos: Produto[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos));
  }

  adicionarProduto(produto: Produto): void {
    const produtos = this.getProdutos();
    produtos.push(produto);
    this.salvarProdutos(produtos);
  }

  atualizarProduto(produtoAtualizado: Produto): void {
    const produtos = this.getProdutos().map(produto =>
      produto.id === produtoAtualizado.id ? produtoAtualizado : produto
    );
    this.salvarProdutos(produtos);
  }

  removerProdutos(codigos: number[]): void {
    const produtos = this.getProdutos().filter(p => !codigos.includes(p.codigo));
    this.salvarProdutos(produtos);
  }

  getProdutoByCodigo(codigo: number): Produto | undefined {
    return this.getProdutos().find(p => p.codigo === codigo);
  }


  alterarQuantidade(codigo: number, delta: number): void {
    const produtos = this.getProdutos().map(p => {
      if (p.codigo === codigo) {

        const novaQuantidade = p.quantidade + delta;

        return {
          ...p,
          quantidade: novaQuantidade < 0 ? 0 : novaQuantidade
        };
      }
      return p;
    });

    this.salvarProdutos(produtos);
  }
}
