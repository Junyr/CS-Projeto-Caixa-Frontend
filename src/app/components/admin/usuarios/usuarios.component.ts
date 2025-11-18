import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Toolbar} from "primeng/toolbar";
import {Router} from '@angular/router';
import {Usuario} from '../../../model/usuario';
import {UsuarioService} from '../../../service/usuario.service';

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
export class UsuariosComponent implements OnInit {

  constructor(private router: Router,
              private usuarioService: UsuarioService) {}

  protected usuarios: Usuario[] = [];

  protected modoExclusao: boolean = false;
  protected usuariosSelecionados: Usuario | Usuario[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.usuarios = this.usuarioService.getUsuarios();
    }
  }

  protected alterarInformacoes(usuario: Usuario) {
    this.router.navigate(['admin/editarUsuario', usuario.id]);
  }

  protected entrarModoExclusao() {
    this.modoExclusao = !this.modoExclusao;
    this.usuariosSelecionados = [];
  }

  protected excluirSelecionados() {
    if (Array.isArray(this.usuariosSelecionados)) {
      if(!this.usuariosSelecionados.length) {
        alert("Nenhum usuário selecionado.");
        return;
      }

      const ids = this.usuariosSelecionados.map(u => u.id!);

      this.usuarioService.removerUsuarios(ids);

      this.usuariosSelecionados = [];
      this.modoExclusao = false;
      this.usuarios = this.usuarioService.getUsuarios();
    }
  }

  protected novo() {
    this.router.navigate(['admin/novoUsuario']);
  }

  protected voltar() {
    this.router.navigate(['admin/home']);
  }

  protected readonly Array = Array;
}
