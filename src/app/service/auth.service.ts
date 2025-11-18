import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {Usuario} from '../model/usuario';
import {UsuarioInfo} from '../model/usuarioInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_KEY: string = "token";

  private usuarioInfoSubject = new BehaviorSubject<UsuarioInfo>({
    nome: '',
    email: '',
    perfil: ''
  });

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem(this.TOKEN_KEY);

      if (email) {
        const userData = localStorage.getItem(email);

        if (userData) {
          const usuario: UsuarioInfo = JSON.parse(userData);

          this.usuarioInfoSubject.next({
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil
          });
        }
      }    }
  }

  usuarioInfo$ = this.usuarioInfoSubject.asObservable();

  login(email: string, senha: string): boolean {

    const userData = localStorage.getItem(email);

    if (!userData) {
      alert("Usuário não encontrado!");
      return false;
    }

    const usuario = JSON.parse(userData);

    if (usuario.senha !== senha) {
      alert("Senha incorreta!");
      return false;
    }

    // Guardar token
    localStorage.setItem(this.TOKEN_KEY, email);

    // Atualizar informações globais
    this.usuarioInfoSubject.next({
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    });

    if (usuario.perfil === 'ADMIN') {
      this.router.navigate(['/admin/home']);
    } else if (usuario.perfil === 'OPERADOR') {
      this.router.navigate(['/home']);
    } else {
      alert("Perfil inválido!");
      return false;
    }
    return true;
  }


  cadastrar(usuario: Usuario) {
    const existeUsuario = localStorage.getItem(usuario.email);

    if (existeUsuario) {
      alert("E-mail ja existe!");
      return false;
    }

    localStorage.setItem(usuario.email, JSON.stringify(usuario));
    alert("Cadastrado com sucesso!");
    return true;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);

    this.usuarioInfoSubject.next({
      nome: '',
      email: '',
      perfil: ''
    });

    this.router.navigate(['/login']);
  }


  getIsAuthorized(): boolean{
    /* if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.TOKEN_KEY);
    } */
    return true;
  }
}
