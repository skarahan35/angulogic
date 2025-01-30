export interface SidebarModel {
  bannerOptions?: Banner;
  userOptions?: User;
  searchOptions?: Search;
  sidebarData: SidebarData[];
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
  cssClass?: string;
  onClick?: (element: 'avatar' | 'name') => void;
}

export interface Search {
  placeholder?: string;
  caseSensitive?: boolean;
  strategy?: 'contains' | 'startsWith' | 'endsWith' | 'equal';
  cssClass?: string;
  localCompare?: string;
  onSearchStart?: (data: SearchStartEvent) => void;
  onSearchEnd?: (data: SearchEndEvent) => void;
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
  isFavorited?: boolean;
  badge?: number | string;
  cssClass?: string;
  children?: MenuData[];
  active?: boolean;
  onClick?: (event: MenuClickEvent) => void;
  onToggle?: (event: MenuClickEvent) => void;
}

export interface SidebarOptions {
  resize?: boolean; //+
  expand?: boolean; //+
  favorites?: boolean; //+
  favoritesTitle?: string; //+
  search?: boolean; //+
  cssClass?: string; //+
  viewMode?: 'fix' | 'hover' | 'toggle' | 'mobile'; //+
  theme?: 'light' | 'dark'; //+
  themePicker?: boolean;
  minWidth?: number; //+
  maxWidth?: number; //+
  width?: number; //+
  themeText?: { light: string; dark: string };
  autoPosition?: boolean; //+
  toggleCollapseIcon?: string; //+
  toggleExpandIcon?: string; //+
  pinIcon?: string; //+
  unpinIcon?: string; //+
  closeIcon?: string; //+
  pinned?: boolean; //+
  onThemeChange?: (theme: 'light' | 'dark') => void; //+
  onResizeStart?: (event: ResizeEvent) => void; //+
  onResizing?: (event: ResizeEvent) => void; //+
  onResizeEnd?: (event: ResizeEvent) => void; //+
  onExpand?: (event: ExpandClickEvent) => void;
  onCollapse?: (event: ExpandClickEvent) => void;
  onMenuNodeClick?: (event: MenuClickEvent) => void; //+
}

export interface ResizeEvent {
  cancel?: boolean;
  sidebarOptions: SidebarModel;
  mouseEvent?: MouseEvent;
}

export interface SearchStartEvent {
  cancel?: boolean;
  searchValue: string;
  nativeElement: HTMLInputElement;
}

export interface SearchEndEvent {
  menuData: MenuData[] | SidebarData[] | [];
}

export interface MenuClickEvent {
  cancel?: boolean;
  menuData: MenuData;
}

export interface ExpandClickEvent {
  cancel?: boolean;
  click?: boolean;
}
