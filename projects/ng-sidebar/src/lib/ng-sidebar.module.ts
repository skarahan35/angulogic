import { CommonModule, NgStyle } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSidebarComponent } from "./component/ng-sidebar.component";

@NgModule({
  declarations: [
    NgSidebarComponent
  ],
  imports: [
    CommonModule,
    NgStyle
  ],
  exports: [
    NgSidebarComponent
  ]
})
export class NgSidebarModule {}
