import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { campoNaoSalvoGuard } from './guard/campo-nao-salvo.guard';
import { authGuard } from './guard/auth.guard';
import {HomeComponent} from './components/operador/home/home.component';
import {RelatorioComponent} from './components/relatorio/relatorio.component';
import {HomeAdminComponent} from './components/admin/home-admin/home-admin.component';
import {AlterarinfoComponent} from './components/admin/alterarinfo/alterarinfo.component';
import {NovoProdutoComponent} from './components/admin/novo-produto/novo-produto.component';
import {UsuariosComponent} from './components/admin/usuarios/usuarios.component';
import {NovoUsuarioComponent} from './components/admin/novo-usuario/novo-usuario.component';
import {EditarUsuarioComponent} from './components/admin/editar-usuario/editar-usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent, canDeactivate: [campoNaoSalvoGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'admin/home', component: HomeAdminComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'admin/novoProduto', component: NovoProdutoComponent },
  { path: 'admin/editar', component: AlterarinfoComponent },
  { path: 'admin/usuarios', component: UsuariosComponent },
  { path: 'admin/novoUsuario', component: NovoUsuarioComponent },
  { path: 'admin/editarUsuario', component: EditarUsuarioComponent }
];
