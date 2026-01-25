import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeActions } from './node-actions';

describe('NodeActions', () => {
  let component: NodeActions;
  let fixture: ComponentFixture<NodeActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
