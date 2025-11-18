import { Injectable } from '@angular/core';
import {Venda} from '../model/vendaProdutos';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private vendas: Venda[] = [];

  registrarVenda(venda: Venda) {
    this.vendas.push(venda);
  }

  getVendas(): Venda[] {
    return this.vendas;
  }

}
