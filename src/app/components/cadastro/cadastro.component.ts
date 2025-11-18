import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: '../../templates/form-template.scss'
})
export class CadastroComponent implements OnInit {

  perfis = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'OPERADOR', value: 'OPERADOR' }
  ];

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    perfil: ''
  };

  isSalvo: boolean = false;

  constructor(private router: Router,
              private authService: AuthService){}

  ngOnInit(): void {
    this.isSalvo = false;
  }

  cadastrar() {
    const bool = this.authService.cadastrar(this.usuario);
    if (bool) {
      this.isSalvo = true;
      this.router.navigate(['/login']);
    }
  }

  voltar() {
    this.router.navigate(["/login"]);
  }

}
