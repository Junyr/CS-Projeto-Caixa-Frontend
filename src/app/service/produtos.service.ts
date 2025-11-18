import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private STORAGE_KEY = 'produtos';

  constructor() { }

  // 📌 Retorna todos os produtos
  getProdutos(): Produto[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // 📌 Salva todos os produtos no localStorage
  private salvarProdutos(produtos: Produto[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos));
  }

  // 📌 Adiciona um produto novo
  adicionarProduto(produto: Produto): void {
    const produtos = this.getProdutos();
    produtos.push(produto);
    this.salvarProdutos(produtos);
  }

  // 📌 Atualiza um produto existente
  atualizarProduto(produtoAtualizado: Produto): void {
    const produtos = this.getProdutos().map(produto =>
      produto.id === produtoAtualizado.id ? produtoAtualizado : produto
    );
    this.salvarProdutos(produtos);
  }

  // 📌 Remove um produto do estoque
  removerProduto(id: number): void {
    const produtos = this.getProdutos().filter(produto => produto.id !== id);
    this.salvarProdutos(produtos);
  }

  // 📌 Busca por ID
  getProdutoById(id: number): Produto | undefined {
    return this.getProdutos().find(p => p.id === id);
  }

  // 📌 Ajustar estoque (entrada/saída)
  alterarQuantidade(id: number, delta: number): void {
    const produtos = this.getProdutos().map(p => {
      if (p.id === id) {
        return { ...p, quantidade: p.quantidade + delta };
      }
      return p;
    });

    this.salvarProdutos(produtos);
  }
}
