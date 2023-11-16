import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdbComponent } from './cdb.component';

describe('CdbComponent', () => {
  let component: CdbComponent;
  let fixture: ComponentFixture<CdbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CdbComponent]
    });
    fixture = TestBed.createComponent(CdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
