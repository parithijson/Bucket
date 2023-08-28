import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PojectComponent } from './poject.component';

describe('PojectComponent', () => {
  let component: PojectComponent;
  let fixture: ComponentFixture<PojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PojectComponent]
    });
    fixture = TestBed.createComponent(PojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
