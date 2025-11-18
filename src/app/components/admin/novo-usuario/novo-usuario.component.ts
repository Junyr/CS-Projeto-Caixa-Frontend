import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Router} from '@angular/router';
import {Usuario} from '../../../model/usuario';
import {UsuarioService} from '../../../service/usuario.service';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-novo-usuario',
  imports: [
    Button,
    FormsModule,
    InputText,
    DropdownModule
  ],
  templateUrl: './novo-usuario.component.html',
  styleUrl: './novo-usuario.component.scss'
})
export class NovoUsuarioComponent {

  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  usuario: Usuario = {
    email: '', nome: '', perfil: '', senha: ''
  };

  perfis = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'OPERADOR', value: 'OPERADOR' }
  ];

  salvar() {
    this.usuarioService.adicionarUsuario(this.usuario);
    this.router.navigate(['admin/home']);
  }

  cancelar() {
    this.router.navigate(['admin/usuarios']);
  }

}
