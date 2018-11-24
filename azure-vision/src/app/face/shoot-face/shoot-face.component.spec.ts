import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootFaceComponent } from './shoot-face.component';

describe('ShootFaceComponent', () => {
  let component: ShootFaceComponent;
  let fixture: ComponentFixture<ShootFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShootFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
