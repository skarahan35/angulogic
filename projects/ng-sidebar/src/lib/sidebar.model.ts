export class SidebarModel {
  bannerOptions?: Banner;
  userOptions?: User;
  searchOptions?: Search;
  sidebarData!: SidebarData[];
  favorites?: MenuData[];
  options: SidebarOptions;

  constructor(data: Partial<SidebarModel> & { sidebarData: SidebarData[] }) {
    this.bannerOptions = data.bannerOptions;
    this.userOptions = data.userOptions;
    this.searchOptions = data.searchOptions;
    this.sidebarData = data.sidebarData;
    this.favorites = data.favorites;
    this.options = data.options ?? new SidebarOptions({});
  }
}

export class Banner {
  logo?: string;
  title?: string;
  onClick?: (element: 'logo' | 'title') => void;

  constructor(options: Partial<Banner>) {
    this.logo = options.logo ?? 'assets/icons/angular-logo.png';
    this.title = options.title ?? 'Angulogic';
    this.onClick = options.onClick;
  }
}

export class User {
  avatar?: string;
  name?: string;
  position?: "top" | "bottom";
  onClick?: (element: 'avatar' | 'name') => void;

  constructor(options: Partial<User>) {
    this.avatar = options.avatar;
    this.name = options.name;
    this.position = options.position ?? "bottom";
    this.onClick = options.onClick;
  }
}

export class Search {
  placeholder?: string;
  caseSensitive?: boolean;
  strategy?: "contains" | "startsWith" | "endsWith";
  cssClass?: string;
  onSearch?: (searchText: string & { cancel: boolean }) => void;

  constructor(options: Partial<Search>) {
    this.placeholder = options.placeholder;
    this.caseSensitive = options.caseSensitive ?? false;
    this.strategy = options.strategy ?? "contains";
    this.cssClass = options.cssClass;
    this.onSearch = options.onSearch;
  }
}

export class SidebarData {
  title: string;
  cssClass?: string;
  visible?: boolean;
  data: MenuData[];

  constructor(options: Partial<SidebarData> & { title: string, data: MenuData[] }) {
    this.title = options.title;
    this.cssClass = options.cssClass;
    this.visible = options.visible ?? true;
    this.data = options.data;
  }
}

export class MenuData {
  name: string;
  icon?: string;
  route?: string;
  visible?: boolean;
  disabled?: boolean;
  isExpanded?: boolean;
  badge?: number | string;
  cssClass?: string;
  children?: MenuData[];
  onClick?: (element: MenuData & { cancel: boolean }) => void;

  constructor(options: Partial<MenuData> & { name: string }) {
    this.name = options.name;
    this.icon = options.icon;
    this.route = options.route;
    this.visible = options.visible ?? true;
    this.disabled = options.disabled ?? false;
    this.isExpanded = options.isExpanded ?? false;
    this.badge = options.badge;
    this.cssClass = options.cssClass;
    this.children = options.children;
    this.onClick = options.onClick;
  }
}

export class Favorites {
  favoritesText: string = 'Favorites';
  favoritesData?: FavoritesData[];
}

export class FavoritesData {
  name: string;
  icon?: string;
  route?: string;
  badge?: number | string;
  cssClass?: string;
  onClick?: (element: MenuData & { cancel: boolean }) => void;
  onFavorite?: (element: MenuData & { cancel: boolean }) => void;

  constructor(options: Partial<FavoritesData> & { name: string }) {
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
  resize?: boolean;
  expand?: boolean;
  favorites?: boolean;
  search?: boolean;
  cssClass?: string;
  viewMode?: "fix" | "hover" | "toggle";
  theme?: "light" | "dark";
  themePicker?: boolean;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  themeText?: { light: string, dark: string };
  autoPosition?: boolean;
  toggleCollapseIcon?: string;
  toggleExpandIcon?: string;
  onThemeChange?: (theme: "light" | "dark") => void;
  onResizeStart?: (event: ResizeEvent) => void;
  onResizing?: (event: ResizeEvent) => void;
  onResizeEnd?: (event: ResizeEvent) => void;
  onExpand?: (event: MouseEvent) => void;
  onCollapse?: (event: MouseEvent) => void;

  constructor(options: Partial<SidebarOptions>) {
    this.resize = options.resize ?? true;
    this.expand = options.expand ?? true;
    this.favorites = options.favorites ?? true;
    this.search = options.search ?? true;
    this.cssClass = options.cssClass ?? '';
    this.viewMode = options.viewMode ?? "toggle";
    this.theme = options.theme ?? "light";
    this.themePicker = options.themePicker ?? true;
    this.minWidth = options.minWidth ?? 300;
    this.maxWidth = options.maxWidth ?? 500;
    this.width = options.width ?? 300;
    this.themeText = options.themeText ?? { light: 'Light', dark: 'Dark' };
    this.autoPosition = options.autoPosition ?? true;
    this.toggleCollapseIcon = options.toggleCollapseIcon ?? 'assets/icons/collapse.png';
    this.toggleExpandIcon = options.toggleExpandIcon ?? 'assets/icons/expand.png';
    this.onThemeChange = options.onThemeChange;
    this.onResizeStart = options.onResizeStart;
    this.onResizing = options.onResizing;
    this.onResizeEnd = options.onResizeEnd;
    this.onExpand = options.onExpand;
    this.onCollapse = options.onCollapse;
  }


}

export class ResizeEvent {
  cancel?: boolean;
  sidebarOptions: SidebarModel;
  mouseEvent?: MouseEvent;

  constructor(options: ResizeEvent) {
    this.cancel = options.cancel;
    this.sidebarOptions = options.sidebarOptions;
    this.mouseEvent = options.mouseEvent;
  }
}
