/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GestionUsuarioService } from './gestion-usuario.service';

describe('AppGestionusuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionUsuarioService]
    });
  });

  it('should ...', inject([GestionUsuarioService], (service: GestionUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
