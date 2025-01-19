import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'al-theme-toggler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss'
})
export class ThemeTogglerComponent {
  currentTheme: 'light' | 'dark' = 'light'
  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.currentTheme === 'dark' ? document.body.classList.add('al-dark-theme') : document.body.classList.remove('al-dark-theme')
  }
}
