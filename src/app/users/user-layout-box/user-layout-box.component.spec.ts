import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLayoutBoxComponent } from './user-layout-box.component';

describe('UserLayoutBoxComponent', () => {
  let component: UserLayoutBoxComponent;
  let fixture: ComponentFixture<UserLayoutBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLayoutBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLayoutBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
