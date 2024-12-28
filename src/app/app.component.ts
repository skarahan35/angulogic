import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSidebarModule } from '../../projects/ng-sidebar/src/lib/ng-sidebar.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgSidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angulogic';
}
