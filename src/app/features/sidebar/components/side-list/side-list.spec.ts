import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideList } from './side-list';

describe('SideList', () => {
  let component: SideList;
  let fixture: ComponentFixture<SideList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
