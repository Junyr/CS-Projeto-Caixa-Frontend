import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Toolbar} from "primeng/toolbar";
import {Venda} from '../../model/vendaProdutos';
import {Router} from '@angular/router';
import {VendaService} from '../../service/venda.service';

@Component({
  selector: 'app-relatorio',
    imports: [
        Button,
        FormsModule,
        PrimeTemplate,
        TableModule,
        Toolbar
    ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent {

  constructor(private router: Router,
              private vendaService: VendaService) {
    if (typeof window !== 'undefined') {
      this.vendas = this.vendaService.getVendas();
    }
  }

  vendas: Venda[] = [];

  protected voltar() {
    this.router.navigate(['/home']);
  }

  protected voltarAdmin() {
    this.router.navigate(['admin/home']);
  }
}
