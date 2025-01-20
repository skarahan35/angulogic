import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSidebarService } from '../../ng-sidebar.service';

@Component({
  selector: 'al-theme-toggler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss'
})
export class ThemeTogglerComponent {
  currentTheme: 'light' | 'dark' = 'light'

  constructor(private sidebarService: NgSidebarService) {

  }
  toggleTheme(): void {
    this.currentTheme === 'dark' ? this.currentTheme = 'light' : this.currentTheme = 'dark'
    this.sidebarService.changeTheme()
  }
}
