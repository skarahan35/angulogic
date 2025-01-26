import { CommonModule, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSidebarComponent } from './component/ng-sidebar.component';
import { ThemeTogglerModule } from './component/theme-toggler/theme-toggler.module';
import { AlIconComponent } from './component/al-icon/al-icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NgSidebarComponent, AlIconComponent],
  imports: [CommonModule, NgStyle, ThemeTogglerModule, HttpClientModule],
  exports: [NgSidebarComponent],
})
export class NgSidebarModule {}
