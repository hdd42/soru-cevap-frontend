import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIndexDetailComponent } from './user-index-detail.component';

describe('UserIndexDetailComponent', () => {
  let component: UserIndexDetailComponent;
  let fixture: ComponentFixture<UserIndexDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIndexDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIndexDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
