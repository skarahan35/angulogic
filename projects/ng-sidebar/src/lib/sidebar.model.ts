export class SidebarModel {
  bannerOptions?: Banner;
  userOptions?: User;
  searchOptions?: Search;
  sidebarData!: SidebarData[];
  favorites?: MenuData[];
}

export class Banner {
  logo?: string;
  title?: string;
  onClick?: (element: 'logo' | 'title') => void;

  constructor(options:Partial<Banner>) {
    this.logo = options.logo;
    this.title = options.title;
    this.onClick = options.onClick;
  }
}

export class User {
  avatar?: string;
  name?: string;
  position?: "top" | "bottom" = "bottom";
  onClick?: (element: 'avatar' | 'name') => void;

  constructor(options:Partial<User>) {
    this.avatar = options.avatar;
    this.name = options.name;
    this.position = options.position;
    this.onClick = options.onClick;
  }
}

export class Search {
  placeholder?: string;
  caseSensitive?: boolean = false;
  strategy?: "contains" | "startsWith" | "endsWith" = "contains";
  cssClass?: string;
  onSearch?: (searchText: string & {cancel: boolean}) => void;

  constructor(options:Partial<Search>) {
    this.placeholder = options.placeholder;
    this.caseSensitive = options.caseSensitive;
    this.strategy = options.strategy;
    this.cssClass = options.cssClass;
    this.onSearch = options.onSearch;
  }
}

export class SidebarData {
  title: string;
  cssClass?: string;
  visible?: boolean = true;
  data: MenuData[];

  constructor(options:Partial<SidebarData> & { title: string, data: MenuData[] }) {
    this.title = options.title;
    this.cssClass = options.cssClass;
    this.visible = options.visible;
    this.data = options.data;
  }
}

export class MenuData {
  name: string;
  icon?: string;
  route?: string;
  visible?: boolean = true;
  disabled?: boolean = false;
  isExpanded?: boolean = false;
  badge?: number | string;
  cssClass?: string;
  children?: MenuData[];
  onClick?: (element: MenuData & { cancel: boolean }) => void;

  constructor(options:Partial<MenuData> & { name: string }) {
    this.name = options.name;
    this.icon = options.icon;
    this.route = options.route;
    this.visible = options.visible;
    this.disabled = options.disabled;
    this.isExpanded = options.isExpanded;
    this.badge = options.badge;
    this.cssClass = options.cssClass;
    this.children = options.children;
    this.onClick = options.onClick;
  }
}

export class Favorites{
  favoritesText:string = 'Favorites';
  favoritesData?: FavoritesData[];
}

export class FavoritesData{
  name: string;
  icon?: string;
  route?: string;
  badge?: number | string;
  cssClass?: string;
  onClick?: (element: MenuData & { cancel: boolean }) => void;
  onFavorite?: (element: MenuData & { cancel: boolean }) => void;

  constructor(options:Partial<FavoritesData> & { name: string }) {
    this.name = options.name;
    this.icon = options.icon;
    this.route = options.route;
    this.badge = options.badge;
    this.cssClass = options.cssClass;
    this.onClick = options.onClick;
    this.onFavorite = options.onFavorite;
  }
}
