export interface Produto {
  id?: number;
  codigo: number;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number
  quantidadeSelecionada?: number;
}
