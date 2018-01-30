import { TestBed, inject } from '@angular/core/testing';

import { AppClientesService } from './app-clientes.service';

describe('AppClientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppClientesService]
    });
  });

  it('should be created', inject([AppClientesService], (service: AppClientesService) => {
    expect(service).toBeTruthy();
  }));
});
