import { Component, OnInit } from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Toolbar} from "primeng/toolbar";
import {Venda} from '../../model/vendaProdutos';
import {Router} from '@angular/router';
import {VendaService} from '../../service/venda.service';
import {AuthService} from '../../service/auth.service';
import {Usuario} from '../../model/usuario';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-relatorio',
  imports: [
    Button,
    FormsModule,
    PrimeTemplate,
    TableModule,
    Toolbar,
    NgIf
  ],
  templateUrl: './relatorio.component.html',
  standalone: true,
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent implements OnInit {

  usuarioLogado!: Usuario;
  vendas: Venda[] = [];

  constructor(private router: Router,
              private vendaService: VendaService,
              private authService: AuthService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.vendas = this.vendaService.getVendas();
    }

    // Escuta usuário logado
    this.authService.usuarioInfo$.subscribe(u => {
      if (u) {
        this.usuarioLogado = u;
      }
    });
  }

  protected voltar() {
    this.router.navigate(['/home']);
  }

  protected voltarAdmin() {
    this.router.navigate(['admin/home']);
  }
}
