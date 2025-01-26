import { NgModule } from '@angular/core';
import { ThemeTogglerComponent } from './theme-toggler.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ThemeTogglerComponent],
  imports: [CommonModule],
  exports: [ThemeTogglerComponent],
})
export class ThemeTogglerModule {}
