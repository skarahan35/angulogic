import { CommonModule, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSidebarComponent } from './component/ng-sidebar.component';
import { ThemeTogglerComponent } from './component/theme-toggler/theme-toggler.component';

@NgModule({
  declarations: [NgSidebarComponent],
  imports: [CommonModule, NgStyle,ThemeTogglerComponent],
  exports: [NgSidebarComponent],
})
export class NgSidebarModule {}
