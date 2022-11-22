import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasusComponent } from './casus.component';

describe('CasusComponent', () => {
  let component: CasusComponent;
  let fixture: ComponentFixture<CasusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
