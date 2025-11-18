import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private STORAGE_KEY = 'usuarios';

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!localStorage;
  }

  getUsuarios(): Usuario[] {
    if (!this.isBrowser()) return [];

    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private salvarUsuarios(usuarios: Usuario[]) {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  }

  adicionarUsuario(usuario: Usuario): void {
    const usuarios = this.getUsuarios();

    const novoId =
      usuarios.length === 0
        ? 1
        : Math.max(...usuarios.map(u => u.id ?? 0)) + 1;

    usuario.id = novoId;

    usuarios.push(usuario);
    this.salvarUsuarios(usuarios);
  }

  atualizarUsuario(usuarioAtualizado: Usuario): void {
    const usuarios = this.getUsuarios().map(usuario =>
      usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario
    );
    this.salvarUsuarios(usuarios);
  }

  removerUsuarios(ids: number[]): void {
    const usuarios = this.getUsuarios().filter(usuario => !ids.includes(usuario.id!));
    this.salvarUsuarios(usuarios);
  }

  getUsuarioById(id: number): Usuario | undefined {
    return this.getUsuarios().find(u => u.id === id);
  }

  getUsuarioByEmail(email: string): Usuario | undefined {
    return this.getUsuarios().find(u => u.email === email);
  }
}
