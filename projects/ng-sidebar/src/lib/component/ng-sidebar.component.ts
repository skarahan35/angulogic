import { Component } from '@angular/core';
import { sidebarModel } from '../menu-data';
import { MenuData, SidebarModel } from '../sidebar.model';

@Component({
  selector: 'ng-sidebar',
  templateUrl: './ng-sidebar.component.html',
  styleUrls: ['./ng-sidebar.component.scss'],

})
export class NgSidebarComponent {
  sidebarModel: SidebarModel;

  constructor() {
    this.sidebarModel = sidebarModel;
    console.log(this.sidebarModel);
  }

  onBannerClick(element: 'logo' | 'title') {
    console.log(`${element} clicked`);
  }

  onUserClick(element: 'avatar' | 'name') {
    console.log(`${element} clicked`);
  }

  onSearch(searchText: string & { cancel: boolean }) {
    console.log(`Searching for: ${searchText}`);
  }

  onMenuClick(menuItem: MenuData & { cancel: boolean }) {
    console.log(`Menu item clicked: ${menuItem.name}`);
  }

  onFavoriteClick(favorite: MenuData & { cancel: boolean }) {
    console.log(`Favorite clicked: ${favorite.name}`);

  }
}
