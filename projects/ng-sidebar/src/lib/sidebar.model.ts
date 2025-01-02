export interface SidebarModel {
  bannerOptions?: Banner;
  userOptions?: User;
  searchOptions?: Search;
  sidebarData: SidebarData[];
  favorites?: MenuData[];
  options: SidebarOptions;
}

export interface Banner {
  logo?: string;
  title?: string;
  onClick?: (element: 'logo' | 'title') => void;
}

export interface User {
  avatar?: string;
  name?: string;
  position?: 'top' | 'bottom';
  onClick?: (element: 'avatar' | 'name') => void;
}

export interface Search {
  placeholder?: string;
  caseSensitive?: boolean;
  strategy?: 'contains' | 'startsWith' | 'endsWith';
  cssClass?: string;
  onSearch?: (searchText: string & { cancel: boolean }) => void;
}

export interface SidebarData {
  title: string;
  cssClass?: string;
  visible?: boolean;
  data: MenuData[];
}

export interface MenuData {
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
}

export interface Favorites {
  favoritesText: string;
  favoritesData?: FavoritesData[];
}

export interface FavoritesData {
  name: string;
  icon?: string;
  route?: string;
  badge?: number | string;
  cssClass?: string;
  onClick?: (element: MenuData & { cancel: boolean }) => void;
  onFavorite?: (element: MenuData & { cancel: boolean }) => void;
}

export interface SidebarOptions {
  resize?: boolean;
  expand?: boolean;
  favorites?: boolean;
  search?: boolean;
  cssClass?: string;
  viewMode?: 'fix' | 'hover' | 'toggle';
  theme?: 'light' | 'dark';
  themePicker?: boolean;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  themeText?: { light: string; dark: string };
  autoPosition?: boolean;
  toggleCollapseIcon?: string;
  toggleExpandIcon?: string;
  onThemeChange?: (theme: 'light' | 'dark') => void;
  onResizeStart?: (event: ResizeEvent) => void;
  onResizing?: (event: ResizeEvent) => void;
  onResizeEnd?: (event: ResizeEvent) => void;
  onExpand?: (event: MouseEvent) => void;
  onCollapse?: (event: MouseEvent) => void;
}

export interface ResizeEvent {
  cancel?: boolean;
  sidebarOptions: SidebarModel;
  mouseEvent?: MouseEvent;
}
