import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoituthienComponent } from './nguoituthien.component';

describe('NguoituthienComponent', () => {
  let component: NguoituthienComponent;
  let fixture: ComponentFixture<NguoituthienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguoituthienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NguoituthienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
