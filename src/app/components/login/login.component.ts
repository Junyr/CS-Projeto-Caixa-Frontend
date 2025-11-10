import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: '../../templates/form-template.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private router: Router, private authService: AuthService){}

  login() {
    // this.authService.login(this.email, this.senha);
  }

  cadastrar() {
    this.router.navigate(["/cadastro"]);
  }
}
