import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVisionExerciseComponent } from './custom-vision-exercise.component';

describe('CustomVisionExerciseComponent', () => {
  let component: CustomVisionExerciseComponent;
  let fixture: ComponentFixture<CustomVisionExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomVisionExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomVisionExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
