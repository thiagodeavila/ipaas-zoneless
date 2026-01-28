import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideContainer } from './side-container';

describe('SideContainer', () => {
  let component: SideContainer;
  let fixture: ComponentFixture<SideContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
