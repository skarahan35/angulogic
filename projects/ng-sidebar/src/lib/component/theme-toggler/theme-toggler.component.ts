import { Component } from '@angular/core';
import { NgSidebarService } from '../../ng-sidebar.service';

/**
 * A component that toggles the theme of the sidebar between 'light' and 'dark'.
 *
 * @export
 * @class ThemeTogglerComponent
 */
@Component({
  selector: 'al-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss',
})
export class ThemeTogglerComponent {
  /**
   * Creates an instance of `ThemeTogglerComponent`.
   *
   * @param {NgSidebarService} sidebarService - The sidebar service used to change the theme.
   */
  constructor(private sidebarService: NgSidebarService) {}

  /**
   * Toggles the sidebar theme between 'light' and 'dark'.
   * Calls the `changeTheme()` method from `NgSidebarService`.
   */
  toggleTheme(): void {
    this.sidebarService.changeTheme();
  }
}
