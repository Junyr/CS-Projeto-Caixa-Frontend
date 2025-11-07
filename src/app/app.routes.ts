import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { campoNaoSalvoGuard } from './guard/campo-nao-salvo.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent, canDeactivate: [campoNaoSalvoGuard] },
];
