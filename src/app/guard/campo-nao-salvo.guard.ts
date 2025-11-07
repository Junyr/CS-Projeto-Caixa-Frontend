import { CanDeactivateFn } from '@angular/router';
import { CadastroComponent } from '../components/cadastro/cadastro.component';

export const campoNaoSalvoGuard: CanDeactivateFn<CadastroComponent> = (component, currentRoute, currentState, nextState) => {
  if(!component.isSalvo) {
    return confirm("Existem alterações não salvas. Tem certeza que deseja sair?");
  }
  return true;
};
