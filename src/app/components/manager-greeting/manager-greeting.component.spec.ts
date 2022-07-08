import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGreetingComponent } from './manager-greeting.component';

describe('ManagerGreetingComponent', () => {
  let component: ManagerGreetingComponent;
  let fixture: ComponentFixture<ManagerGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGreetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
