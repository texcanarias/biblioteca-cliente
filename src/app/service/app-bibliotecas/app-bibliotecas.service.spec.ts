import { TestBed, inject } from '@angular/core/testing';

import { AppBibliotecasService } from './app-bibliotecas.service';

describe('AppBibliotecasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppBibliotecasService]
    });
  });

  it('should be created', inject([AppBibliotecasService], (service: AppBibliotecasService) => {
    expect(service).toBeTruthy();
  }));
});
