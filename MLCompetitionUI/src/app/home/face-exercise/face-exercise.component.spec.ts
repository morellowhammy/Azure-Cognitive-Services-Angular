import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceExerciseComponent } from './face-exercise.component';

describe('FaceExerciseComponent', () => {
  let component: FaceExerciseComponent;
  let fixture: ComponentFixture<FaceExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
