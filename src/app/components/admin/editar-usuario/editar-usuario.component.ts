import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../../model/usuario';
import {UsuarioService} from '../../../service/usuario.service';
import {NgIf} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-editar-usuario',
  imports: [
    Button,
    FormsModule,
    InputText,
    NgIf,
    DropdownModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService
  ) { }

  usuario: Usuario = {
    email: '', nome: '', perfil: '', senha: ''
  };

  perfis = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'OPERADOR', value: 'OPERADOR' }
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      const usuarioEncontrado = this.usuarioService.getUsuarioById(id);

      if (!usuarioEncontrado) {
        alert("Usuario não encontrado!");
        this.router.navigate(['admin/home']);
        return;
      }

      this.usuario = { ...usuarioEncontrado };
    }
  }

  salvar() {
    this.usuarioService.atualizarUsuario(this.usuario);
    this.router.navigate(['admin/home']);
  }

  cancelar() {
    this.router.navigate(['admin/usuarios']);
  }

}
