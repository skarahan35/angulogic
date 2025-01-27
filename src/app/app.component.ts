import { Component } from '@angular/core';
import { NgSidebarModule } from '../../projects/ng-sidebar/src/lib/ng-sidebar.module';
import { SidebarModel } from '../../projects/ng-sidebar/src/lib/sidebar.model';
import { NgSidebarService } from '../../projects/ng-sidebar/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgSidebarModule],
  providers: [NgSidebarService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angulogic';

  constructor(private ngSidebarService: NgSidebarService) {}

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
        data: [
          {
            name: 'Dashboard',
            icon: 'assets/icons/ts.png',
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
                icon: '',
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
            icon: 'https://cdn-icons-png.flaticon.com/512/535/535239.png',
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
    options: {
      resize: true,
      expand: true,
      favorites: true,
      search: true,
      cssClass: 'custom-sidebar',
      viewMode: 'toggle',
      theme: 'light',
      themePicker: true,
      minWidth: 350,
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
      onThemeChange: event => console.log('Sidebar theme changed', event),
      onMenuNodeClick: event => console.log('Sidebar menu node clicked', event),
    },
  };
  change() {
    this.sidebarModel.options.autoPosition = false;
    this.sidebarModel.bannerOptions!.title = 'test';
  }

  changeTheme() {
    this.ngSidebarService.changeTheme();
  }
}
