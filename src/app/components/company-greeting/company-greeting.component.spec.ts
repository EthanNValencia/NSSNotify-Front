import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGreetingComponent } from './company-greeting.component';

describe('CompanyGreetingComponent', () => {
  let component: CompanyGreetingComponent;
  let fixture: ComponentFixture<CompanyGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyGreetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
