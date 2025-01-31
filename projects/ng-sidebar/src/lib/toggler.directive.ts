import { Directive, HostListener } from '@angular/core';
import { NgSidebarService } from './ng-sidebar.service';

/**
 * A directive that toggles the sidebar when the attached element is clicked.
 *
 * @export
 * @class TogglerDirective
 */
@Directive({
  selector: '[sidebarToggler]',
})
export class TogglerDirective {
  /**
   * Creates an instance of `TogglerDirective`.
   *
   * @param {NgSidebarService} sidebarService - The sidebar service that manages sidebar state.
   */
  constructor(private sidebarService: NgSidebarService) {}

  /**
   * Listens for click events on the host element and toggles the sidebar.
   */
  @HostListener('click')
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
