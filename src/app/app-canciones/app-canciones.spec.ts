import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCanciones } from './app-canciones';

describe('AppCanciones', () => {
  let component: AppCanciones;
  let fixture: ComponentFixture<AppCanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCanciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCanciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
