import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateNftComponent } from './validate-nft.component';

describe('ValidateNftComponent', () => {
  let component: ValidateNftComponent;
  let fixture: ComponentFixture<ValidateNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateNftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
