import { Injectable } from '@angular/core';
import {
  ExpandClickEvent,
  MenuData,
  ResizeEvent,
  SidebarData,
  SidebarModel,
} from './sidebar.model';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/**
 * Service responsible for managing sidebar state, configurations, and behaviors.
 * It handles sidebar initialization, resizing, menu interactions, and theme changes.
 *
 * @export
 * @class NgSidebarService
 */
@Injectable({
  providedIn: 'root',
})
export class NgSidebarService {
  /**
   * Tracks whether auto-positioning is enabled.
   * @default false
   */
  autoPositionActive: boolean = false;

  /**
   * Indicates whether the sidebar is currently being resized.
   * @default false
   */
  isResizing: boolean = false;

  /**
   * Stores the complete sidebar configuration and data.
   */
  sidebarData!: SidebarModel;

  /**
   * MutationObserver to monitor sidebar style changes for auto-positioning.
   */
  private observer!: MutationObserver;

  /**
   * Initializes the sidebar service and listens for route changes.
   *
   * @param {Router} router - Angular Router for detecting navigation events.
   * @param {HttpClient} http - Angular HttpClient for loading assets (e.g., SVG icons).
   */
  constructor(
    public router: Router,
    private http: HttpClient
  ) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        this.sidebarData.sidebarData.forEach(data => {
          this.updateActiveState(data.data, route.url);
        });
      }
    });
  }

  /**
   * Initializes the sidebar configuration with default values if not provided.
   *
   * @param {Partial<SidebarModel> & { sidebarData: SidebarData[] }} data - Sidebar data with optional configurations.
   * @returns {SidebarModel} - The complete SidebarModel with default values applied.
   */
  initilazeSidebarData(
    data: Partial<SidebarModel> & { sidebarData: SidebarData[] }
  ): SidebarModel {
    // Banner options
    data.bannerOptions = data.bannerOptions
      ? {
          logo: data.bannerOptions.logo ?? 'assets/icons/angular-logo.png',
          title: data.bannerOptions.title ?? 'Angulogic',
          onClick: data.bannerOptions.onClick,
        }
      : undefined;

    // User options
    data.userOptions = data.userOptions
      ? {
          avatar: data.userOptions.avatar ?? 'assets/icons/avatar.svg',
          name: data.userOptions.name,
          position: data.userOptions.position ?? 'bottom',
          onClick: data.userOptions.onClick,
        }
      : undefined;

    // Search options
    data.searchOptions = data.searchOptions
      ? {
          placeholder: data.searchOptions.placeholder,
          caseSensitive: data.searchOptions.caseSensitive ?? false,
          strategy: data.searchOptions.strategy ?? 'contains',
          cssClass: data.searchOptions.cssClass,
          localCompare: data.searchOptions.localCompare ?? 'en',
          onSearchStart: data.searchOptions.onSearchStart,
          onSearchEnd: data.searchOptions.onSearchEnd,
        }
      : undefined;

    // Sidebar data initialization
    data.sidebarData = data.sidebarData.map(item => ({
      title: item.title,
      cssClass: item.cssClass,
      visible: item.visible ?? true,
      data: this.initializeMenuData(item.data),
    }));

    // Sidebar options initialization
    data.options = data.options
      ? {
          resize: data.options.resize ?? true,
          expand: data.options.expand ?? true,
          favorites: data.options.favorites ?? true,
          favoritesTitle: data.options.favoritesTitle ?? 'Favorites',
          search: data.options.search ?? true,
          cssClass: data.options.cssClass ?? '',
          viewMode: data.options.viewMode ?? 'toggle',
          theme: data.options.theme ?? 'light',
          themePicker: data.options.themePicker ?? true,
          minWidth: data.options.minWidth ?? 300,
          maxWidth: data.options.maxWidth ?? 500,
          width: data.options.width ?? 300,
          themeText: data.options.themeText ?? { light: 'Light', dark: 'Dark' },
          autoPosition: data.options.autoPosition ?? true,
          toggleCollapseIcon:
            data.options.toggleCollapseIcon ?? 'assets/icons/collapse.svg',
          toggleExpandIcon:
            data.options.toggleExpandIcon ?? 'assets/icons/expand.svg',
          pinIcon: data.options.pinIcon ?? 'assets/icons/pin.svg',
          unpinIcon: data.options.unpinIcon ?? 'assets/icons/unpin.svg',
          closeIcon: data.options.closeIcon ?? 'assets/icons/cancel.svg',
          pinned:
            data.options.pinned ??
            (data.options.expand && data.options.viewMode === 'hover') ??
            false,
          onThemeChange: data.options.onThemeChange,
          onResizeStart: data.options.onResizeStart,
          onResizing: data.options.onResizing,
          onResizeEnd: data.options.onResizeEnd,
          onExpand: data.options.onExpand,
          onCollapse: data.options.onCollapse,
          onMenuNodeClick: data.options.onMenuNodeClick,
        }
      : {
          resize: true,
          expand: true,
          favorites: true,
          search: true,
          viewMode: 'toggle',
          theme: 'light',
        };

    this.sidebarData = data as SidebarModel;
    return data as SidebarModel;
  }

  /**
   * Enables automatic positioning of the sidebar.
   * It observes the sidebar's width and updates the CSS variable `--sidebar-width` dynamically.
   */
  setAutoPosition(): void {
    const divElement = document.getElementById('ng-sidebar');
    if (!divElement) {
      return;
    }

    if (!document.body.classList.contains('auto-position')) {
      document.body.classList.add('auto-position');
    }

    const duration = 300;
    this.observer = new MutationObserver(() => {
      const width = divElement.offsetWidth;
      this.updateWidth(divElement, performance.now(), duration);
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${width}px`
      );
    });

    this.observer.observe(divElement, {
      attributeFilter: ['style'],
    });

    this.autoPositionActive = true;
    console.log('Auto position enabled');
  }

  /**
   * Animates the width update of the sidebar.
   *
   * @param {HTMLElement} divElement - The sidebar element whose width is being updated.
   * @param {number} startTime - The start time of the animation.
   * @param {number} duration - The duration of the width animation in milliseconds.
   */
  updateWidth(
    divElement: HTMLElement,
    startTime: number,
    duration: number
  ): void {
    const animateWidth = (timestamp: number) => {
      let progress = (timestamp - startTime) / duration;
      const currentWidth = divElement.offsetWidth;
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${currentWidth}px`
      );
      if (progress < 1) {
        requestAnimationFrame(animateWidth);
      }
    };
    requestAnimationFrame(animateWidth);
  }

  /**
   * Disables automatic positioning of the sidebar.
   * Stops observing style changes and resets CSS modifications.
   */
  destroyAutoPosition(): void {
    this.observer.disconnect();
    if (document.body.classList.contains('auto-position')) {
      document.body.classList.remove('auto-position');
    }
    this.autoPositionActive = false;
    console.log('Auto position disabled');
  }

  /**
   * Handles sidebar resizing using mouse events.
   *
   * @param {SidebarModel} sidebarData - The sidebar configuration object.
   */
  resize(sidebarData: SidebarModel): void {
    this.isResizing = true;
    const initialPin = sidebarData.options.pinned;
    sidebarData.options.pinned = true;

    const startEvent: ResizeEvent = {
      cancel: false,
      sidebarOptions: sidebarData,
    };

    if (sidebarData.options.onResizeStart) {
      sidebarData.options.onResizeStart(startEvent);
      if (startEvent.cancel) {
        this.isResizing = false;
        return;
      }
    }

    document.body.classList.add('no-select');

    /**
     * Handles mouse movement during resizing.
     *
     * @param {MouseEvent} e - The mouse movement event.
     */
    const mouseMoveListener = (e: MouseEvent) => {
      const resizeEvent: ResizeEvent = {
        cancel: false,
        sidebarOptions: sidebarData,
        mouseEvent: e,
      };

      if (sidebarData.options.onResizing) {
        sidebarData.options.onResizing(resizeEvent);
        if (resizeEvent.cancel) {
          return;
        }
      }

      if (
        sidebarData.options.minWidth &&
        e.clientX < sidebarData.options.minWidth
      ) {
        sidebarData.options.width = sidebarData.options.minWidth;
      } else if (
        sidebarData.options.maxWidth &&
        e.clientX > sidebarData.options.maxWidth
      ) {
        sidebarData.options.width = sidebarData.options.maxWidth;
      } else {
        sidebarData.options.width = e.clientX;
      }
    };

    document.addEventListener('mousemove', mouseMoveListener);

    /**
     * Handles mouse release after resizing.
     *
     * @param {MouseEvent} e - The mouse up event.
     */
    const mouseUpListener = (e: MouseEvent) => {
      document.body.classList.remove('no-select');
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);

      this.isResizing = false;
      sidebarData.options.pinned = initialPin;

      const endEvent: ResizeEvent = {
        sidebarOptions: sidebarData,
        mouseEvent: e,
      };

      if (sidebarData.options.onResizeEnd) {
        sidebarData.options.onResizeEnd(endEvent);
      }
    };

    document.addEventListener('mouseup', mouseUpListener);
  }

  /**
   * Initializes menu data by assigning default values if not provided.
   *
   * @param {MenuData[]} menuData - The menu data array to initialize.
   * @returns {MenuData[]} - The processed menu data with default values applied.
   */
  private initializeMenuData(menuData: MenuData[]): MenuData[] {
    return menuData.map(item => ({
      name: item.name,
      icon: item.icon,
      route: item.route,
      visible: item.visible ?? true,
      disabled: item.disabled ?? false,
      isExpanded: item.isExpanded ?? false,
      isFavorited: item.isFavorited ?? false,
      cssClass: item.cssClass,
      active: item.active ?? false,
      children: item.children
        ? this.initializeMenuData(item.children)
        : undefined,
      onClick: item.onClick,
      onToggle: item.onToggle,
    }));
  }

  /**
   * Searches for menu items by name within the sidebar data.
   *
   * @param {SidebarModel} data - The sidebar configuration containing menu data.
   * @param {string} searchValue - The search query entered by the user.
   * @returns {MenuData[]} - An array of matching menu items.
   */
  searchByName(data: SidebarModel, searchValue: string): MenuData[] {
    const { searchOptions, sidebarData } = data;

    /**
     * Compares two strings based on the configured search options.
     *
     * @param {string} source - The original menu item name.
     * @param {string} target - The search query entered by the user.
     * @returns {boolean} - True if the search criteria match, false otherwise.
     */
    const compareStrings = (source: string, target: string): boolean => {
      if (!searchOptions?.caseSensitive) {
        source = source.toLocaleLowerCase(searchOptions?.localCompare);
        target = target.toLocaleLowerCase(searchOptions?.localCompare);
      }
      switch (searchOptions?.strategy) {
        case 'contains':
          return source.includes(target);
        case 'startsWith':
          return source.startsWith(target);
        case 'endsWith':
          return source.endsWith(target);
        case 'equal':
          return source === target;
        default:
          return false;
      }
    };

    /**
     * Recursively searches menu items and their children.
     *
     * @param {MenuData[]} data - The menu items to search in.
     * @returns {MenuData[]} - The filtered menu items.
     */
    const searchInMenuData = (data: MenuData[]): MenuData[] => {
      const resultSet = new Set<MenuData>();
      data.forEach(item => {
        if (compareStrings(item.name, searchValue)) {
          resultSet.add(item);
        }
        if (item.children && item.children.length > 0) {
          const childResults = searchInMenuData(item.children);
          if (childResults.length > 0) {
            item.children = childResults;
            resultSet.add(item);
          }
        }
      });

      return Array.from(resultSet);
    };

    return sidebarData.flatMap(sidebarItem =>
      searchInMenuData(sidebarItem.data)
    );
  }

  /**
   * Updates the active state of menu items based on the current route.
   *
   * @param {MenuData[]} menuData - The menu data array to update.
   * @param {string} currentRoute - The current active route.
   */
  updateActiveState(menuData: MenuData[], currentRoute: string): void {
    menuData.forEach(item => {
      if (item.route?.startsWith('/')) {
        item.active = item.route === currentRoute;
      } else {
        item.active = `/${item.route}` === currentRoute;
      }

      if (item.children) {
        this.updateActiveState(item.children, currentRoute);
      }
    });
  }

  /**
   * Toggles the sidebar theme between 'light' and 'dark'.
   * Updates the `theme` property in `sidebarData.options`.
   */
  changeTheme(): void {
    if (this.sidebarData.options.theme === 'light') {
      this.sidebarData.options.theme = 'dark';
    } else {
      this.sidebarData.options.theme = 'light';
    }

    // Trigger theme change event if provided
    if (this.sidebarData.options.onThemeChange) {
      this.sidebarData.options.onThemeChange(this.sidebarData.options.theme);
    }
  }

  /**
   * Loads an SVG file from the given path.
   *
   * @param {string} path - The file path of the SVG to load.
   * @returns {Promise<string>} - A promise resolving to the SVG content.
   */
  loadSvg(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(path, { responseType: 'text' }).subscribe({
        next: svgContent => resolve(svgContent),
        error: err =>
          reject(
            new Error(`Failed to load SVG: ${path}. Error: ${err.message}`)
          ),
      });
    });
  }

  /**
   * Toggles the sidebar's expanded or collapsed state.
   * Triggers the appropriate expand/collapse event if provided.
   */
  async toggleSidebar(): Promise<void> {
    let event: ExpandClickEvent = {
      cancel: false,
      click: true,
    };

    // Trigger collapse event if sidebar is currently expanded
    if (this.sidebarData.options.expand) {
      await Promise.resolve(this.sidebarData.options.onCollapse?.(event));
    }
    // Trigger expand event if sidebar is currently collapsed
    else {
      await Promise.resolve(this.sidebarData.options.onExpand?.(event));
    }

    // If the event was canceled, do not toggle
    if (event.cancel) return;

    // Toggle expand/collapse state
    this.sidebarData.options.expand = !this.sidebarData.options.expand;
  }
}
