import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDeTailsComponent } from './question-de-tails.component';

describe('QuestionDeTailsComponent', () => {
  let component: QuestionDeTailsComponent;
  let fixture: ComponentFixture<QuestionDeTailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDeTailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDeTailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
