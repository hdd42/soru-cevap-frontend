import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigModalComponent } from './big-modal.component';

describe('BigModalComponent', () => {
  let component: BigModalComponent;
  let fixture: ComponentFixture<BigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
