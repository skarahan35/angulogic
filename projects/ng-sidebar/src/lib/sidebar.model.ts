export class SidebarModel {
  bannerOptions?: Banner;
  userOptions?: User;
  searchOptions?: Search;
  sidebarData!: SidebarData[];
  favorites?: MenuData[];
  options?: SidebarOptions;

  constructor(options: Partial<SidebarModel> & { sidebarData: SidebarData[] }) {
    this.bannerOptions = options.bannerOptions;
    this.userOptions = options.userOptions;
    this.searchOptions = options.searchOptions;
    this.sidebarData = options.sidebarData;
    this.favorites = options.favorites;
    this.options = options.options;
  }
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

export class SidebarOptions {
  resize?: boolean = true;
  expand?: boolean = true;
  favorites?: boolean = true;
  search?: boolean = true;
  cssClass?: string;
  viewMode?: "fix" | "hover"| "toggle" = "toggle";
  theme?: "light" | "dark" = "light";
  themePicker?: boolean = true;
  minWidth?: number = 300;
  maxWidth?: number = 500;
  width?: number = 300;
  themeText?: { light: string, dark: string } = { light: 'Light', dark: 'Dark' };
  onThemeChange?: (theme: "light" | "dark") => void;
  onResize?: (event: MouseEvent) => void;
  onExpand?: (event: MouseEvent) => void;
  onCollapse?: (event: MouseEvent) => void;

  constructor(options:Partial<SidebarOptions>) {
    this.resize = options.resize;
    this.expand = options.expand;
    this.favorites = options.favorites;
    this.search = options.search;
    this.cssClass = options.cssClass;
    this.viewMode = options.viewMode;
    this.theme = options.theme;
    this.themePicker = options.themePicker;
    this.minWidth = options.minWidth;
    this.maxWidth = options.maxWidth;
    this.width = options.width;
    this.themeText = options.themeText;
    this.onThemeChange = options.onThemeChange;
    this.onResize = options.onResize;
    this.onExpand = options.onExpand;
    this.onCollapse = options.onCollapse;
  }

}
