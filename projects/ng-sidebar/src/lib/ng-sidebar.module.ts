import { CommonModule, NgStyle } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSidebarComponent } from "./component/ng-sidebar.component";
import { ThemeTogglerModule } from "./component/theme-toggler/theme-toggler.module";

@NgModule({
  declarations: [NgSidebarComponent],
  imports: [CommonModule, NgStyle, ThemeTogglerModule],
  exports: [NgSidebarComponent],
})
export class NgSidebarModule {}
