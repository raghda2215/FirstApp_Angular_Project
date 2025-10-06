import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityEvtComponentComponent } from './visibility-evt-component.component';

describe('VisibilityEvtComponentComponent', () => {
  let component: VisibilityEvtComponentComponent;
  let fixture: ComponentFixture<VisibilityEvtComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisibilityEvtComponentComponent]
    });
    fixture = TestBed.createComponent(VisibilityEvtComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
