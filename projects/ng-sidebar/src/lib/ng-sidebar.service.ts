import { Injectable } from '@angular/core';
import {
  MenuData,
  ResizeEvent,
  SidebarData,
  SidebarModel,
} from './sidebar.model';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NgSidebarService {
  auotoPositionActive: boolean = false;
  isResizing: boolean = false;
  sidebarData!: SidebarModel;
  private observer!: MutationObserver;
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  themeChange$ = this.themeSubject.asObservable();

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

  initilazeSidebarData(
    data: Partial<SidebarModel> & { sidebarData: SidebarData[] }
  ): SidebarModel {
    //#region Banner options
    data.bannerOptions = data.bannerOptions
      ? {
          logo: data.bannerOptions.logo ?? 'assets/icons/angular-logo.png',
          title: data.bannerOptions.title ?? 'Angulogic',
          onClick: data.bannerOptions.onClick,
        }
      : undefined;
    //#endregion

    //#region User options
    data.userOptions = data.userOptions
      ? {
          avatar: data.userOptions.avatar ?? 'assets/icons/avatar.svg',
          name: data.userOptions.name,
          position: data.userOptions.position ?? 'bottom',
          onClick: data.userOptions.onClick,
        }
      : undefined;

    //#region Search options
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
    //#endregion

    //#region Sidebar data
    data.sidebarData.map(item => ({
      title: item.title,
      cssClass: item.cssClass,
      visible: item.visible ?? true,
      data: this.initializeMenuData(item.data),
    }));
    //#endregion

    //#region Favorites data
    data.favorites = data.favorites
      ? data.favorites.map(item => ({
          name: item.name,
          icon: item.icon,
          route: item.route,
          visible: item.visible ?? true,
          disabled: item.disabled ?? false,
          isExpanded: item.isExpanded ?? false,
          badge: item.badge,
          cssClass: item.cssClass,
          active: item.active ?? false,
          children: item.children,
          onClick: item.onClick,
        }))
      : undefined;
    //#endregion

    //#region Initialize menu data
    data.options = data.options
      ? {
          resize: data.options.resize ?? true,
          expand: data.options.expand ?? true,
          favorites: data.options.favorites ?? true,
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
          pinIcon: data.options.toggleCollapseIcon ?? 'assets/icons/pin.svg',
          unpinIcon: data.options.toggleExpandIcon ?? 'assets/icons/unpin.svg',
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
    //#endregion

    this.sidebarData = data as SidebarModel;
    return data as SidebarModel;
  }

  setAutoPosition() {
    const divElement = document.getElementById('ng-sidebar');
    if (!divElement) {
      console.error('Resizable div not found!');
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

    this.auotoPositionActive = true;
    console.log('Auto position enabled');
  }

  updateWidth(divElement: HTMLElement, startTime: number, duration: number) {
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

  destroyAutoPosition() {
    this.observer.disconnect();
    if (document.body.classList.contains('auto-position')) {
      document.body.classList.remove('auto-position');
    }
    this.auotoPositionActive = false;
    console.log('Auto position disabled');
  }

  resize(sidebarData: SidebarModel) {
    this.isResizing = true;
    const initalPin = sidebarData.options.pinned;
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

    const mouseUpListener = (e: MouseEvent) => {
      document.body.classList.remove('no-select');
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);

      this.isResizing = false;
      sidebarData.options.pinned = initalPin;

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

  private initializeMenuData(menuData: MenuData[]): MenuData[] {
    return menuData.map(item => {
      item['id'] = this.generateUuid();
      item['name'] = item['name'];
      item['icon'] = item['icon'];
      item['route'] = item['route'];
      item['visible'] = item['visible'] ?? true;
      item['disabled'] = item['disabled'] ?? false;
      item['isExpanded'] = item['isExpanded'] ?? false;
      item['badge'] = item['badge'];
      item['cssClass'] = item['cssClass'];
      item['active'] = item['active'] ?? false;
      item['children'] = item['children']
        ? this.initializeMenuData(item['children'])
        : undefined;
      item['onClick'] = item['onClick'];
      return item;
    });
  }

  searchByName(data: SidebarModel, searchValue: string): MenuData[] {
    const { searchOptions, sidebarData } = data;

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

  changeTheme(theme?: 'light' | 'dark') {
    if (theme) {
      if (theme === 'dark') {
        if (!document.body.classList.contains('al-dark-theme')) {
          document.body.classList.add('al-dark-theme');
        }
      } else {
        document.body.classList.remove('al-dark-theme');
      }
      this.themeSubject.next(theme);
    } else {
      if (document.body.classList.contains('al-dark-theme')) {
        document.body.classList.remove('al-dark-theme');
        this.themeSubject.next('light');
      } else {
        document.body.classList.add('al-dark-theme');
        this.themeSubject.next('dark');
      }
    }
  }

  loadSvg(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(path, { responseType: 'text' }).subscribe({
        next: svgContent => resolve(svgContent),
        error: err =>
          reject(new Error(`SVG yüklenemedi: ${path}. Hata: ${err.message}`)),
      });
    });
  }

  private generateUuid(): string {
    return Math.random().toString(36).substring(2, 6);
  }
}
