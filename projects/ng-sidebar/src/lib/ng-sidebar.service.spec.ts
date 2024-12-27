import { TestBed } from '@angular/core/testing';

import { NgSidebarService } from './ng-sidebar.service';

describe('NgSidebarService', () => {
  let service: NgSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
