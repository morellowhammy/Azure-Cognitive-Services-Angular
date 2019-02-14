import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlstudioExerciseComponent } from './mlstudio-exercise.component';

describe('MlstudioExerciseComponent', () => {
  let component: MlstudioExerciseComponent;
  let fixture: ComponentFixture<MlstudioExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlstudioExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlstudioExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
