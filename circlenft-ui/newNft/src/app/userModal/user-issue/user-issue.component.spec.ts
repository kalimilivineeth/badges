import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIssueComponent } from './user-issue.component';

describe('UserIssueComponent', () => {
  let component: UserIssueComponent;
  let fixture: ComponentFixture<UserIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
