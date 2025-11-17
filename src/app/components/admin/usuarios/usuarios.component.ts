import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Toolbar} from "primeng/toolbar";
import {Router} from '@angular/router';
import {Produto} from '../../../model/produto';
import {Usuario} from '../../../model/usuario';

@Component({
  selector: 'app-usuarios',
    imports: [
        Button,
        NgIf,
        PrimeTemplate,
        TableModule,
        Toolbar
    ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  constructor(private router: Router) {
  }

  protected usuarioLogado: string = '';

  protected usuarios: Usuario[] = [];

  protected modoExclusao: boolean = false;
  protected usuariosSelecionados: Produto | Produto[] = [];

  protected adicionarItem() {

  }

  protected abrirEstoque() {

  }

  protected logout() {

  }

  protected alterarInformacoes() {
    this.router.navigate(['admin/editarUsuario']);
  }

  protected entrarModoExclusao() {
    this.modoExclusao = !this.modoExclusao;
    this.usuariosSelecionados = [];
  }

  protected excluirSelecionados() {

  }

  protected novo() {
    this.router.navigate(['admin/novoUsuario']);
  }

  protected voltar() {
    this.router.navigate(['admin/home']);
  }

  protected readonly Array = Array;
}
