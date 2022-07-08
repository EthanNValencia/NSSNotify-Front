import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCenterComponent } from './about-center.component';

describe('AboutCenterComponent', () => {
  let component: AboutCenterComponent;
  let fixture: ComponentFixture<AboutCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
