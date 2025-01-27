import { Component } from '@angular/core';
import { NgSidebarService } from '../../ng-sidebar.service';

@Component({
  selector: 'al-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss',
})
export class ThemeTogglerComponent {
  constructor(private sidebarService: NgSidebarService) {}
  toggleTheme(): void {
    this.sidebarService.changeTheme();
  }
}
