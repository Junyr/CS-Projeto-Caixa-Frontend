import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = "token";

  private usuarioInfoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioInfo$ = this.usuarioInfoSubject.asObservable();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    if (typeof window !== 'undefined') {
      const id = Number(localStorage.getItem(this.TOKEN_KEY));
      if (id) {
        const usuario = this.usuarioService.getUsuarioById(id);
        if (usuario) this.usuarioInfoSubject.next(usuario);
      }
    }
  }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarioService.getUsuarioByEmail(email);

    if (!usuario) {
      alert("Usuário não encontrado!");
      return false;
    }

    if (usuario.senha !== senha) {
      alert("Senha incorreta!");
      return false;
    }

    localStorage.setItem(this.TOKEN_KEY, usuario.id!.toString());

    this.usuarioInfoSubject.next(usuario);

    if (usuario.perfil === 'ADMIN') {
      this.router.navigate(['/admin/home']);
    } else {
      this.router.navigate(['/home']);
    }

    return true;
  }

  cadastrar(usuario: Usuario): boolean {
    const existe = this.usuarioService.getUsuarioByEmail(usuario.email);

    if (existe) {
      alert("E-mail já cadastrado!");
      return false;
    }

    this.usuarioService.adicionarUsuario(usuario);
    alert("Cadastrado com sucesso!");
    return true;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.usuarioInfoSubject.next(null);
    this.router.navigate(['/login']);
  }

  getIsAuthorized(): boolean {
    if (typeof window === 'undefined') return false; // Evita o erro no Node

    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
