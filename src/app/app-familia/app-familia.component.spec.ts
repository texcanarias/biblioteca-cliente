import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFamiliaComponent } from './app-familia.component';

describe('AppFamiliaComponent', () => {
  let component: AppFamiliaComponent;
  let fixture: ComponentFixture<AppFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
