import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRootComponent } from './tasks-root.component';

describe('TasksRootComponent', () => {
  let component: TasksRootComponent;
  let fixture: ComponentFixture<TasksRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
