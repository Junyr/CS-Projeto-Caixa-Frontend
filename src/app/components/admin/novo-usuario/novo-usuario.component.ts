import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputNumber} from "primeng/inputnumber";
import {InputText} from "primeng/inputtext";
import {Router} from '@angular/router';
import {Produto} from '../../../model/produto';
import {Usuario} from '../../../model/usuario';

@Component({
  selector: 'app-novo-usuario',
    imports: [
        Button,
        FormsModule,
        InputNumber,
        InputText
    ],
  templateUrl: './novo-usuario.component.html',
  styleUrl: './novo-usuario.component.scss'
})
export class NovoUsuarioComponent {

  constructor(private router: Router) { }

  usuario: Usuario = {
    email: '', nome: '', perfil: '', senha: ''
  };

  salvar() {
    console.log('Usuario salvo:', this.usuario);
    this.router.navigate(['admin/home']);
  }

  cancelar() {
    this.router.navigate(['admin/usuarios']);
  }

}
