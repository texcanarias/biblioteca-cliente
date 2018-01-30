import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClientesComponent } from './app-clientes.component';

describe('AppClientesComponent', () => {
  let component: AppClientesComponent;
  let fixture: ComponentFixture<AppClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
