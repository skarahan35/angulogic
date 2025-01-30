import { CommonModule, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSidebarComponent } from './component/ng-sidebar.component';
import { AlIconComponent } from './component/al-icon/al-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { TogglerDirective } from './toggler.directive';
import { ThemeTogglerComponent } from './component/theme-toggler/theme-toggler.component';

@NgModule({
  declarations: [NgSidebarComponent, AlIconComponent, TogglerDirective, ThemeTogglerComponent],
  imports: [CommonModule, NgStyle, HttpClientModule],
  exports: [NgSidebarComponent, TogglerDirective, ThemeTogglerComponent],
})
export class NgSidebarModule {}
