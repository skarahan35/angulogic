import { Directive, HostListener, Input } from '@angular/core';
import { NgSidebarService } from './ng-sidebar.service';

@Directive({
  selector: '[sidebarToggler]',
})
export class TogglerDirective {
  constructor(private sidebarService: NgSidebarService) {}

  @HostListener('click')
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
