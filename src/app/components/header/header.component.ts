import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { NgIf } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { UsuarioInfo } from '../../model/usuarioInfo';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  usuario: UsuarioInfo = {
    nome: '',
    perfil: ''
  };

  constructor(private authService: AuthService) {
    this.authService.usuarioInfo$.subscribe(u => {
      this.usuario = u;
    });
  }

  sair() { this.authService.logout(); }

  getIsAuthorized(): boolean { return this.authService.getIsAuthorized(); }
}
