import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSidebarComponent } from "./component/ng-sidebar.component";

@NgModule({
  declarations: [
    NgSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgSidebarComponent
  ]
})
export class NgSidebarModule {}
