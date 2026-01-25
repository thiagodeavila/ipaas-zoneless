import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasActions } from './canvas-actions';

describe('CanvasActions', () => {
  let component: CanvasActions;
  let fixture: ComponentFixture<CanvasActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
