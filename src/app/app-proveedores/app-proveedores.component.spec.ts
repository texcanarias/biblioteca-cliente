import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProveedoresComponent } from './app-proveedores.component';

describe('AppProveedoresComponent', () => {
  let component: AppProveedoresComponent;
  let fixture: ComponentFixture<AppProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
