import { TestBed, inject } from '@angular/core/testing';

import { AppProveedoresService } from './app-proveedores.service';

describe('AppProveedoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppProveedoresService]
    });
  });

  it('should be created', inject([AppProveedoresService], (service: AppProveedoresService) => {
    expect(service).toBeTruthy();
  }));
});
