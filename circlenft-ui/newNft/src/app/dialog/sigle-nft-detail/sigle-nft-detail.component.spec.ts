import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigleNftDetailComponent } from './sigle-nft-detail.component';

describe('SigleNftDetailComponent', () => {
  let component: SigleNftDetailComponent;
  let fixture: ComponentFixture<SigleNftDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigleNftDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigleNftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
