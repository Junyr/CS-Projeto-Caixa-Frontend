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



  login(){
    this.router.navigate(["/home"]);
  }

  logout(){
    this.router.navigate(["/login"]);
  }

  getIsAuthorized(): boolean{
    /* if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.TOKEN_KEY);
    } */
    return true;
  }
}
