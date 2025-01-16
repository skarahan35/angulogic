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
      onClick: element => {
        console.log('Banner clicked', element);
      },
    },
    userOptions: {
      name: 'John Doe',
      position: 'bottom',
      onClick: element => {
        console.log('User clicked', element);
      },
    },
    searchOptions: {
      caseSensitive: false,
      strategy: 'contains',
      cssClass: 'search-bar',
      onSearchStart: data => {
        console.log('Search cancel value: ', data.searchValue);
      },
      onSearchEnd(data) {
        console.log(data);
      },
      localCompare: 'tr',
    },
    sidebarData: [
      {
        title: 'Main Menu',
        cssClass: 'main-sidebar',
        visible: true,
        icon: 'assets/icons/dashboard-icon.svg',
        data: [
          {
            name: 'Dashboard',
            icon: 'assets/icons/dashboard-icon.svg',
            route: '/dashboard',
            visible: true,
            badge: 3,
            isExpanded: true,
            children: [
              {
                name: 'Overview',
                icon: 'assets/icons/overview.svg',
                visible: true,
                badge: 'New',
                route: 'sidebar',
              },
              {
                name: 'Stats',
                route: 'www.google.com',
                visible: true,
                children: [
                  {
                    name: 'User Stats',
                    route: 'test',
                    visible: true,
                  },
                  {
                    name: 'Sales Stats',
                    route: 'assets/icons/sales.svg',
                    visible: true,
                    disabled: true,
                  },
                ],
              },
            ],
            onClick: element => {
              element.cancel = true;
              console.log('Dashboard clicked', element);
            },
            onToggle: element => {
              console.log('Dashboard toggled', element);
            },
          },
          {
            name: 'Settings',
            icon: 'assets/icons/preferences.svg',
            route: '/settings',
            visible: true,
            isExpanded: false,
            children: [
              {
                name: 'Profile',
                icon: 'assets/icons/profile.svg',
                visible: true,
              },
              {
                name: 'Preferences',
                visible: true,
                children: [
                  {
                    name: 'Language',
                    visible: true,
                  },
                  {
                    name: 'Notifications',
                    visible: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Reports',
        cssClass: 'reports-sidebar',
        visible: true,
        icon: 'assets/icons/dashboard-icon.svg',
        data: [
          {
            name: 'Monthly Reports',
            route: '/reports/monthly',
            visible: true,
            badge: 7,
            onClick: element => {
              console.log('Monthly Reports clicked', element);
              element.cancel = false;
            },
          },
          {
            name: 'Annual Reports',
            route: '/reports/annual',
            visible: true,
            disabled: false,
          },
        ],
      },
      {
        title: 'User Management',
        cssClass: 'user-management-sidebar',
        visible: true,
        icon: 'assets/icons/dashboard-icon.svg',
        data: [
          {
            name: 'Users',
            icon: 'assets/icons/users-icon.svg',
            route: '/users',
            visible: true,
            children: [
              {
                name: 'Active Users',
                route: '/users/active',
                visible: true,
              },
              {
                name: 'Inactive Users',
                route: '/users/inactive',
                visible: true,
              },
            ],
          },
          {
            name: 'Roles',
            icon: 'assets/icons/role.svg',
            route: '/roles',
            visible: true,
            children: [
              {
                name: 'Admin',
                route: '/roles/admin',
                visible: true,
              },
              {
                name: 'Editor',
                route: '/roles/editor',
                visible: true,
              },
            ],
          },
        ],
      },
      {
        title: 'Help',
        cssClass: 'help-sidebar',
        visible: true,
        icon: 'assets/icons/dashboard-icon.svg',
        data: [
          {
            name: 'FAQ',
            route: '/help/faq',
            visible: true,
          },
          {
            name: 'Contact Support',
            route: '/help/contact',
            visible: true,
          },
        ],
      },
      {
        title: 'Help',
        cssClass: 'help-sidebar',
        visible: true,
        data: [
          {
            name: 'FAQ',
            route: '/help/faq',
            visible: true,
          },
          {
            name: 'Contact Support',
            route: '/help/contact',
            visible: true,
          },
        ],
      },
    ],
    favorites: [
      {
        name: 'Quick Access',
        icon: 'assets/icons/access.png',
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
      viewMode: 'toggle',
      theme: 'light',
      themePicker: true,
      minWidth: 100,
      maxWidth: 600,
      width: 350,
      themeText: {
        light: 'Light Mode',
        dark: 'Dark Mode',
      },
      autoPosition: true,
      onResizeStart: event => console.log('Sidebar resize started', event),
      onResizing: event => console.log('Sidebar resizing', event),
      onResizeEnd: event => console.log('Sidebar resize ended', event),
      onCollapse: event => console.log('Sidebar collapsed', event),
      onExpand: event => console.log('Sidebar expanded', event),
    },
  };
  change() {
    this.sidebarModel.options.autoPosition = false;
    this.sidebarModel.bannerOptions!.title = 'test';
  }
}
