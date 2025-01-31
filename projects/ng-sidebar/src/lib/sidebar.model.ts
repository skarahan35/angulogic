/**
 * Represents the overall sidebar configuration.
 * It includes menu items, user profile, search settings, and sidebar behavior options.
 *
 * @export
 * @interface SidebarModel
 */
export interface SidebarModel {
  /**
   * Configuration for the sidebar banner (logo and title).
   * If not provided, the banner will not be displayed.
   * @default undefined
   */
  bannerOptions?: Banner;

  /**
   * Configuration for the user profile section.
   * If not provided, the user section will not be displayed.
   * @default undefined
   */
  userOptions?: User;

  /**
   * Configuration for the search functionality.
   * If not provided, the search feature will be disabled.
   * @default undefined
   */
  searchOptions?: Search;

  /**
   * The primary data structure containing all sidebar sections and menu items.
   */
  sidebarData: SidebarData[];

  /**
   * General sidebar settings and options.
   */
  options: SidebarOptions;
}

/**
 * Configuration for the banner section including a logo and title.
 *
 * @export
 * @interface Banner
 */
export interface Banner {
  /**
   * The logo displayed in the sidebar banner.
   * @default "assets/icons/angular-logo.png"
   */
  logo?: string;

  /**
   * The title displayed next to the logo in the banner.
   * @default "Angulogic"
   */
  title?: string;

  /**
   * Event triggered when the logo or title is clicked.
   *
   * @param {('logo' | 'title')} element - The clicked element.
   */
  onClick?: (element: 'logo' | 'title') => void;
}

/**
 * Represents the user profile section displayed in the sidebar.
 *
 * @export
 * @interface User
 */
export interface User {
  /**
   * The avatar image URL for the user.
   * @default "assets/icons/avatar.svg"
   */
  avatar?: string;

  /**
   * The display name of the user.
   */
  name?: string;

  /**
   * Determines whether the user profile appears at the top or bottom of the sidebar.
   * @default "bottom"
   */
  position?: 'top' | 'bottom';

  /**
   * Custom CSS class for styling.
   */
  cssClass?: string;

  /**
   * Custom click event handler for the user profile.
   *
   * @param {('avatar' | 'name')} element - The clicked element.
   */
  onClick?: (element: 'avatar' | 'name') => void;
}

/**
 * Configuration options for the search feature in the sidebar.
 *
 * @export
 * @interface Search
 */
export interface Search {
  /**
   * The placeholder text for the search input field.
   */
  placeholder?: string;

  /**
   * Determines if the search should be case-sensitive.
   * @default false
   */
  caseSensitive?: boolean;

  /**
   * Defines how the search algorithm matches the search term.
   * @default "contains"
   */
  strategy?: 'contains' | 'startsWith' | 'endsWith' | 'equal';

  /**
   * Custom CSS class for styling the search bar.
   */
  cssClass?: string;

  /**
   * The locale used for comparing strings in the search function.
   * @default "en"
   */
  localCompare?: string;

  /**
   * Event triggered when a search starts.
   */
  onSearchStart?: (data: SearchStartEvent) => void;

  /**
   * Event triggered when a search ends.
   */
  onSearchEnd?: (data: SearchEndEvent) => void;
}

/**
 * Represents a section of the sidebar containing multiple menu items.
 *
 * @export
 * @interface SidebarData
 */
export interface SidebarData {
  /**
   * The title of the sidebar section.
   */
  title: string;

  /**
   * Custom CSS class for styling the section.
   */
  cssClass?: string;

  /**
   * Determines whether the section is visible.
   * @default true
   */
  visible?: boolean;

  /**
   * The menu items contained in this section.
   */
  data: MenuData[];
}

/**
 * Represents an individual menu item in the sidebar.
 *
 * @export
 * @interface MenuData
 */
export interface MenuData {
  /**
   * The display name of the menu item.
   */
  name: string;

  /**
   * The icon associated with the menu item.
   */
  icon?: string;

  /**
   * The route/path to navigate when the menu item is clicked.
   */
  route?: string;

  /**
   * Determines if the menu item is visible.
   * @default true
   */
  visible?: boolean;

  /**
   * Determines if the menu item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Indicates whether the menu item is expanded (for collapsible menus).
   * @default false
   */
  isExpanded?: boolean;

  /**
   * Indicates if the menu item is marked as a favorite.
   * @default false
   */
  isFavorited?: boolean;

  /**
   * Custom CSS class for styling the menu item.
   */
  cssClass?: string;

  /**
   * Submenu items nested under this menu item.
   */
  children?: MenuData[];

  /**
   * Indicates whether the menu item is currently active.
   * @default false
   */
  active?: boolean;

  /**
   * Click event handler for the menu item.
   */
  onClick?: (event: MenuClickEvent) => void;

  /**
   * Event triggered when the menu item is toggled (expanded/collapsed).
   */
  onToggle?: (event: MenuClickEvent) => void;
}

/**
 * General configuration options for the sidebar component.
 *
 * @export
 * @interface SidebarOptions
 */
export interface SidebarOptions {
  /**
   * Enables resizing of the sidebar.
   * @default true
   */
  resize?: boolean;

  /**
   * Enables sidebar expansion.
   * @default true
   */
  expand?: boolean;

  /**
   * Enables the favorites section in the sidebar.
   * @default true
   */
  favorites?: boolean;

  /**
   * Title for the favorites section.
   * @default "Favorites"
   */
  favoritesTitle?: string;

  /**
   * Enables the search feature.
   * @default true
   */
  search?: boolean;

  /**
   * Custom CSS class for styling the sidebar.
   */
  cssClass?: string;

  /**
   * Defines the sidebar's view mode.
   * @default "toggle"
   */
  viewMode?: 'fix' | 'hover' | 'toggle' | 'mobile';

  /**
   * Sidebar theme selection.
   * @default "light"
   */
  theme?: 'light' | 'dark';

  /**
   * Enables the theme picker feature.
   * @default true
   */
  themePicker?: boolean;

  /**
   * Minimum width of the sidebar in pixels.
   * @default 300
   */
  minWidth?: number;

  /**
   * Maximum width of the sidebar in pixels.
   * @default 500
   */
  maxWidth?: number;

  /**
   * Default width of the sidebar in pixels.
   * @default 300
   */
  width?: number;

  /**
   * Determines whether the sidebar should be automatically positioned.
   * @default true
   */
  autoPosition?: boolean;

  /**
   * The text used for the light and dark theme switcher.
   * @default { light: "Light", dark: "Dark" }
   */
  themeText?: { light: string; dark: string };

  /**
   * The icon used for collapsing the sidebar.
   * @default "assets/icons/collapse.svg"
   */
  toggleCollapseIcon?: string;

  /**
   * The icon used for expanding the sidebar.
   * @default "assets/icons/expand.svg"
   */
  toggleExpandIcon?: string;

  /**
   * The icon used for pinning the sidebar.
   * @default "assets/icons/pin.svg"
   */
  pinIcon?: string;

  /**
   * The icon used for unpinning the sidebar.
   * @default "assets/icons/unpin.svg"
   */
  unpinIcon?: string;

  /**
   * The icon used for closing the sidebar.
   * @default "assets/icons/cancel.svg"
   */
  closeIcon?: string;

  /**
   * Determines if the sidebar is pinned.
   * @default false (unless expand is true and viewMode is 'hover')
   */
  pinned?: boolean;

  /**
   * Event triggered when the theme changes.
   */
  onThemeChange?: (theme: 'light' | 'dark') => void;

  /**
   * Event triggered when sidebar resizing starts.
   */
  onResizeStart?: (event: ResizeEvent) => void;

  /**
   * Event triggered while resizing the sidebar.
   */
  onResizing?: (event: ResizeEvent) => void;

  /**
   * Event triggered when resizing ends.
   */
  onResizeEnd?: (event: ResizeEvent) => void;

  /**
   * Event triggered when the sidebar expands.
   */
  onExpand?: (event: ExpandClickEvent) => void;

  /**
   * Event triggered when the sidebar collapses.
   */
  onCollapse?: (event: ExpandClickEvent) => void;

  /**
   * Event triggered when a menu item is clicked.
   */
  onMenuNodeClick?: (event: MenuClickEvent) => void;
}

/**
 * Represents an event triggered during sidebar resizing.
 *
 * @export
 * @interface ResizeEvent
 */
export interface ResizeEvent {
  /**
   * Determines if the resizing action should be canceled.
   * @default false
   */
  cancel?: boolean;

  /**
   * The current sidebar configuration during resizing.
   */
  sidebarOptions: SidebarModel;

  /**
   * The mouse event associated with the resize action.
   */
  mouseEvent?: MouseEvent;
}

/**
 * Represents an event triggered when a search starts in the sidebar.
 *
 * @export
 * @interface SearchStartEvent
 */
export interface SearchStartEvent {
  /**
   * Determines if the search operation should be canceled.
   * @default false
   */
  cancel?: boolean;

  /**
   * The value entered by the user in the search input.
   */
  searchValue: string;

  /**
   * The native HTML input element where the search is performed.
   */
  nativeElement: HTMLInputElement;
}

/**
 * Represents an event triggered when a search operation ends in the sidebar.
 *
 * @export
 * @interface SearchEndEvent
 */
export interface SearchEndEvent {
  /**
   * The filtered search results from the sidebar.
   */
  menuData: MenuData[] | SidebarData[] | [];
}

/**
 * Represents an event triggered when a menu item is clicked.
 *
 * @export
 * @interface MenuClickEvent
 */
export interface MenuClickEvent {
  /**
   * Determines if the default menu click behavior should be canceled.
   * @default false
   */
  cancel?: boolean;

  /**
   * The menu item that was clicked.
   */
  menuData: MenuData;
}

/**
 * Represents an event triggered when the sidebar is expanded or collapsed.
 *
 * @export
 * @interface ExpandClickEvent
 */
export interface ExpandClickEvent {
  /**
   * Determines if the expand/collapse action should be canceled.
   * @default false
   */
  cancel?: boolean;

  /**
   * Indicates whether the event was triggered by a user click.
   */
  click?: boolean;
}
