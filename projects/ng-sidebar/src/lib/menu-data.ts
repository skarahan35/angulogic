import { SidebarModel, Banner, User, Search, SidebarData, MenuData, SidebarOptions } from "./sidebar.model";

export const sidebarModel = new SidebarModel({
  bannerOptions: new Banner({
    logo: 'logo.png',
    title: 'My App',
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
    onResize: (event) => console.log('Sidebar resized'),
    onExpand: (event) => console.log('Sidebar expanded'),
    onCollapse: (event) => console.log('Sidebar collapsed')
  })
});
