import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSidebarComponent } from './ng-sidebar.component';

describe('NgSidebarComponent', () => {
  let component: NgSidebarComponent;
  let fixture: ComponentFixture<NgSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
