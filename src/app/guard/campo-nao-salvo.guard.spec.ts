import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { campoNaoSalvoGuard } from './campo-nao-salvo.guard';

describe('campoNaoSalvoGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => campoNaoSalvoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
