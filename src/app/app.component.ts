import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSidebarModule } from '../../projects/ng-sidebar/src/lib/ng-sidebar.module';
import {
  SidebarModel,
  SidebarOptions,
  User,
  Banner,
  MenuData,
  Search,
  SidebarData,
} from '../../projects/ng-sidebar/src/lib/sidebar.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgSidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angulogic';

  sidebarModel: SidebarModel = {
    bannerOptions: {
      title: 'AnguLogic',
    },
    userOptions: {
      avatar: 'assets/images/avatar.png',
      name: 'John Doe',
      position: 'top',
    },
    searchOptions: {
      placeholder: 'Search...',
      caseSensitive: false,
      strategy: 'contains',
      cssClass: 'search-bar',
    },
    sidebarData: [
      {
        title: 'Main Menu',
        cssClass: 'main-menu',
        visible: true,
        data: [
          {
            name: 'Dashboard',
            icon: 'assets/icons/dashboard.png',
            route: '/dashboard',
            visible: true,
            disabled: false,
            isExpanded: false,
            badge: 5,
            cssClass: 'menu-item',
            children: [],
          },
          {
            name: 'Settings',
            icon: 'assets/icons/settings.png',
            route: '/settings',
            visible: true,
            disabled: false,
            isExpanded: true,

            cssClass: 'menu-item',
            children: [
              {
                name: 'Profile',
                icon: 'assets/icons/profile.png',
                route: '/settings/profile',
                visible: true,
                disabled: false,
                isExpanded: false,

                cssClass: 'submenu-item',
                children: [],
              },
            ],
          },
        ],
      },
    ],
    favorites: [
      {
        name: 'Quick Access',
        icon: 'assets/icons/quick-access.png',
        route: '/quick-access',
        visible: true,
        disabled: false,
        isExpanded: false,

        cssClass: 'favorites-item',
        children: [],
      },
    ],
    options: {
      resize: true,
      expand: true,
      favorites: true,
      search: true,
      cssClass: 'custom-sidebar',
      viewMode: 'hover',
      theme: 'light',
      themePicker: true,
      minWidth: 100,
      maxWidth: 600,
      width: 150,
      themeText: {
        light: 'Light Mode',
        dark: 'Dark Mode',
      },
      autoPosition: true,
      onResizeStart: event => console.log('Sidebar resize started'),
      onResizing: event => console.log('Sidebar resizing'),
      onResizeEnd: event => console.log('Sidebar resize ended'),
    },
  };
  change() {
    this.sidebarModel.options.autoPosition = false;
    this.sidebarModel.bannerOptions!.title = 'test';
  }
}
