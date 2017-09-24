import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationsComponent } from './view-applications.component';

describe('ViewApplicationsComponent', () => {
  let component: ViewApplicationsComponent;
  let fixture: ComponentFixture<ViewApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
