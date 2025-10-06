import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFormeComponent } from './member-forme.component';

describe('MemberFormeComponent', () => {
  let component: MemberFormeComponent;
  let fixture: ComponentFixture<MemberFormeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberFormeComponent]
    });
    fixture = TestBed.createComponent(MemberFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
