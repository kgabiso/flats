import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatImageComponent } from './flat-image.component';

describe('FlatImageComponent', () => {
  let component: FlatImageComponent;
  let fixture: ComponentFixture<FlatImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
