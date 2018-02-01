import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlatsComponent } from './new-flats.component';

describe('NewFlatsComponent', () => {
  let component: NewFlatsComponent;
  let fixture: ComponentFixture<NewFlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
