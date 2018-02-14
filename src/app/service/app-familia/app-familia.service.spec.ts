import { TestBed, inject } from '@angular/core/testing';

import { AppFamiliaService } from './app-familia.service';

describe('AppFamiliaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFamiliaService]
    });
  });

  it('should be created', inject([AppFamiliaService], (service: AppFamiliaService) => {
    expect(service).toBeTruthy();
  }));
});
