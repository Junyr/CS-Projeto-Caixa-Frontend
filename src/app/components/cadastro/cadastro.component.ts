import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';

export interface Usuario_Cadastro {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
}

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

  usuario: Usuario_Cadastro = {
    nome: '',
    email: '',
    senha: '',
    perfil: ''
  };

  isSalvo: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.isSalvo = false;
  }

  cadastrar() {
    this.isSalvo = true;
  }

  voltar() {
    this.router.navigate(["/login"]);
  }

}
