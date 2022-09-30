import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalOperationComponent } from './external-operation.component';

describe('ExternalOperationComponent', () => {
  let component: ExternalOperationComponent;
  let fixture: ComponentFixture<ExternalOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
