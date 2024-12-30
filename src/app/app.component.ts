import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSidebarModule } from '../../projects/ng-sidebar/src/lib/ng-sidebar.module';
import { SidebarModel, SidebarOptions, User, Banner, MenuData, Search, SidebarData } from '../../projects/ng-sidebar/src/lib/sidebar.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgSidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angulogic';

  sidebarModel = new SidebarModel({
    bannerOptions: new Banner({
      logo: 'assets/icons/angular-logo.png',
      title: 'Angulogic',
      onClick: (element) => console.log(`Banner ${element} clicked`)
    }),
    userOptions: new User({
      avatar: 'avatar.png',
      name: 'John Doe',
      position: 'top',
      onClick: (element) => console.log(`User ${element} clicked`)
    }),
    searchOptions: new Search({
      placeholder: 'Search...',
      caseSensitive: true,
      strategy: 'startsWith',
      cssClass: 'search-class',
      onSearch: (searchText) => console.log(`Search for ${searchText}`)
    }),
    sidebarData: [
      new SidebarData({
        title: 'Main Menu',
        cssClass: 'main-menu-class',
        visible: true,
        data: [
          new MenuData({
            name: 'Dashboard',
            icon: 'dashboard-icon',
            route: '/dashboard',
            visible: true,
            disabled: false,
            isExpanded: true,
            badge: 5,
            cssClass: 'dashboard-class',
            children: [],
            onClick: (element) => console.log(`Menu ${element.name} clicked`)
          })
        ]
      })
    ],
    favorites: [
      new MenuData({
        name: 'Favorites',
        icon: 'favorites-icon',
        route: '/favorites',
        visible: true,
        disabled: false,
        isExpanded: false,
        badge: 'New',
        cssClass: 'favorites-class',
        children: [],
        onClick: (element) => console.log(`Favorite ${element.name} clicked`)
      })
    ],
    options: new SidebarOptions({
      resize: true,
      expand: true,
      favorites: true,
      search: true,
      cssClass: 'sidebar-class',
      viewMode: 'hover',
      theme: 'dark',
      themePicker: true,
      minWidth: 300,
      maxWidth: 500,
      width: 350,
      themeText: { light: 'Light Mode', dark: 'Dark Mode' },
      onThemeChange: (theme) => console.log(`Theme changed to ${theme}`),
      onResizeStart: (event) => console.log('Sidebar resize started'),
      onResizing: (event) => console.log('Sidebar resizing'),
      onResizeEnd: (event) => console.log('Sidebar resize ended'),
      onExpand: (event) => console.log('Sidebar expanded'),
      onCollapse: (event) => console.log('Sidebar collapsed')
    })
  });

  change() {
    this.sidebarModel.options.autoPosition = false
  }
}
