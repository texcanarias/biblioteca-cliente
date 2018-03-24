import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBibliotecasComponent } from './app-bibliotecas.component';

describe('AppBibliotecasComponent', () => {
  let component: AppBibliotecasComponent;
  let fixture: ComponentFixture<AppBibliotecasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBibliotecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBibliotecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
