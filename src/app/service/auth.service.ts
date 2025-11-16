import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_KEY: string = "token";

  private emailSubject = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.emailSubject = new BehaviorSubject<string>(localStorage.getItem(this.TOKEN_KEY) || '');
    }
  }

  email$ = this.emailSubject.asObservable();



  login(email: string){
    if (email == '' || !email.match("^.+@.+(\\.com|\\.com.br){1}$")) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    const token = email;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.emailSubject.next(email);
    this.router.navigate(['/login']);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.emailSubject.next('');
    this.router.navigate(['/login']);
  }

  getIsAuthorized(): boolean{
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.TOKEN_KEY);
    } return false;
  }
}
