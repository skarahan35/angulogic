import { Component, DoCheck, HostBinding, HostListener, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import {
  ExpandClickEvent,
  MenuClickEvent,
  MenuData,
  SearchEndEvent,
  SearchStartEvent,
  SidebarData,
  SidebarModel,
} from '../sidebar.model';
import { NgSidebarService } from '../ng-sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-sidebar',
  templateUrl: './ng-sidebar.component.html',
  styleUrls: ['./ng-sidebar.component.scss'],
})
export class NgSidebarComponent implements DoCheck, OnInit {
  sidebarData!: SidebarModel;
  SIDEBAR_DATA!: SidebarModel;
  favorites: MenuData[] = [];
  @Input({ required: true }) set options(val: SidebarModel) {
    this.sidebarData = this.ngSidebarService.initilazeSidebarData(val);
    if (!val.options.theme) {
      val.options.theme = 'light';
    }
    this.SIDEBAR_DATA = this.deepClone(this.sidebarData)
  }
  @Input() nodeContent?: TemplateRef<any>;

  @HostBinding('class.ng-sidebar') ngSidebarClass = true;
  @HostBinding('class.collapsed') get isCollapsed() {
    return !this.sidebarData.options.expand;
  }
  @HostBinding('class.transition') get isTransition() {
    return !this.ngSidebarService.isResizing;
  }
  @HostBinding('class.al-dark-theme') get isDarkTheme() {
    return this.sidebarData.options.theme === 'dark';
  }

  @HostBinding('style.width') get sidebarWidth() {
    return this.sidebarData.options.expand
      ? `${this.sidebarData.options.width}px`
      : this.sidebarData.options.viewMode === 'mobile'
      ? '0px'
      : 'var(--collapse-width)';
  }

  @HostBinding('style.maxWidth') get sidebarMaxWidth() {
    return this.sidebarData.options.expand
      ? `${this.sidebarData.options.maxWidth}px`
      : 'unset';
  }

  @HostBinding('style.minWidth') get sidebarMinWidth() {
    return this.sidebarData.options.expand
      ? `${this.sidebarData.options.minWidth}px`
      : 'unset';
  }

  constructor(public ngSidebarService: NgSidebarService) {}

  ngOnInit(): void {
    this.updateFavorites();
  }

  ngDoCheck(): void {
    if (
      this.sidebarData.options.autoPosition !==
      this.ngSidebarService.auotoPositionActive
    ) {
      this.sidebarData.options.autoPosition
        ? this.ngSidebarService.setAutoPosition()
        : this.ngSidebarService.destroyAutoPosition();
    }
  }

  onBannerClick(element: 'logo' | 'title') {
    this.sidebarData.bannerOptions?.onClick?.(element);
  }

  onUserClick(element: 'avatar' | 'name') {
    this.sidebarData.userOptions?.onClick?.(element);
  }

  async onSearch(event: KeyboardEvent) {
    const element = event.currentTarget as HTMLInputElement;
    const searchValue = element.value.trim();
    let searchStartEvent: SearchStartEvent = {
      nativeElement: element,
      searchValue: searchValue,
      cancel: false,
    };

    if (this.sidebarData.searchOptions?.onSearchStart) {
      await Promise.resolve(
        this.sidebarData.searchOptions.onSearchStart(searchStartEvent)
      );
    }

    if (!searchStartEvent.cancel) {
      let filteredResults: MenuData[] = [];
      if (element.value.length > 0) {
        filteredResults = this.ngSidebarService.searchByName(
          this.deepClone(this.SIDEBAR_DATA),
          searchValue
        );
        if (filteredResults.length > 0) {
          this.sidebarData.sidebarData = this.SIDEBAR_DATA.sidebarData.map(
            sidebarItem => {
              const matchingItems = filteredResults.filter(item =>
                sidebarItem.data.some(dataItem => dataItem.name === item.name)
              );
              const updateExpandedState = (item: MenuData) => {
                item.isExpanded = true;
                if (item.children) {
                  item.children.forEach(updateExpandedState);
                }
              };
              matchingItems.forEach(updateExpandedState);
              return {
                ...sidebarItem,
                data: [...new Set(matchingItems)],
              };
            }
          );
          this.sidebarData.sidebarData = this.sidebarData.sidebarData.filter(
            d => d.data.length > 0
          );
        } else {
          this.sidebarData.sidebarData = [];
        }
      } else {
        this.sidebarData = this.deepClone(this.SIDEBAR_DATA);
        this.ngSidebarService.sidebarData = this.sidebarData;
      }
      if (this.sidebarData.searchOptions?.onSearchEnd) {
        let searchEndEvent: SearchEndEvent = {
          menuData: filteredResults,
        };
        this.sidebarData.searchOptions.onSearchEnd(searchEndEvent);
      }
    }
  }

  async onCancelSearch(searchInput: HTMLInputElement) {
    if (searchInput.value === '') return;
    searchInput.value = '';

    let searchStartEvent: SearchStartEvent = {
      nativeElement: searchInput,
      searchValue: searchInput.value,
      cancel: false,
    };

    if (this.sidebarData.searchOptions?.onSearchStart) {
      await Promise.resolve(
        this.sidebarData.searchOptions.onSearchStart(searchStartEvent)
      );
    }

    if (!searchStartEvent.cancel) {
      this.sidebarData = this.deepClone(this.SIDEBAR_DATA);
      this.ngSidebarService.sidebarData = this.sidebarData;
      if (this.sidebarData.searchOptions?.onSearchEnd) {
        let searchEndEvent: SearchEndEvent = {
          menuData: this.SIDEBAR_DATA.sidebarData,
        };
        this.sidebarData.searchOptions.onSearchEnd(searchEndEvent);
      }
    }
  }

  async onMenuClick(node: MenuData, mouseEvent: MouseEvent) {
    let event: MenuClickEvent = {
      menuData: node,
      cancel: false,
    };
    await Promise.resolve(node.onClick?.(event));

    await Promise.resolve(this.sidebarData.options.onMenuNodeClick?.(event));

    if (event.cancel) return;

    if (node.children && node.children.length > 0) {
      this.nodeToggle(node, mouseEvent);
    } else {
      this.ngSidebarService.router.navigate([node.route]);
    }
  }

  async onFavoriteClick(favorite: MenuData & { cancel: boolean }) {
    let event: MenuClickEvent = {
      menuData: favorite,
      cancel: false,
    };

    await Promise.resolve(favorite.onClick?.(event));
    if (event.cancel) return;
  }

  @HostListener('mouseenter')
  onEnter() {
    if (
      this.sidebarData.options.viewMode === 'hover' &&
      !this.sidebarData.options.pinned
    ) {
      this.sidebarData.options.expand = true;
    }
  }
  @HostListener('mouseleave')
  onLeave() {
    if (
      this.sidebarData.options.viewMode === 'hover' &&
      !this.sidebarData.options.pinned
    ) {
      this.sidebarData.options.expand = false;
    }
  }

  async nodeToggle(node: MenuData, event: MouseEvent) {
    let nodeTogglerClickEvent: MenuClickEvent = {
      menuData: node,
      cancel: false,
    };
    await Promise.resolve(node.onToggle?.(nodeTogglerClickEvent));
    if (nodeTogglerClickEvent.cancel) return;

    const nodeElement = (event.currentTarget as HTMLElement).querySelector(
      '.node-toggler'
    );
    const parentNode = event.currentTarget as HTMLElement;
    if (node.isExpanded) {
      nodeElement!.classList.remove('expand');
      Array.from(parentNode!.parentElement!.parentElement!.children)
        .filter(child => child.classList.contains('node'))
        .forEach(child => child.classList.add('out-left'));
      setTimeout(() => {
        node.isExpanded = !node.isExpanded;
      }, 300);
    } else {
      setTimeout(() => {
        Array.from(parentNode!.parentElement!.parentElement!.children)
        .filter(child => child.classList.contains('node'))
        .forEach(child => child.classList.add('in-left'));
      }, 1);
      node.isExpanded = !node.isExpanded;
    }
  }

  onFavoriteNode(node: MenuData) {
    node.isFavorited = !node.isFavorited;
    this.updateFavorites();
  }

  updateFavorites() {
    this.favorites = [];
    this.sidebarData.sidebarData.forEach((data: SidebarData) => {
      if (data.data) {
        this.collectFavorites(data.data);
      }
    });
  }

  collectFavorites(nodes: MenuData[]) {
    nodes.forEach(node => {
      if (node.isFavorited) {
        this.favorites.push(node);
      }
      if (node.children && node.children.length > 0) {
        this.collectFavorites(node.children);
      }
    });
  }

  togglePin() {
    this.sidebarData.options.pinned = !this.sidebarData.options.pinned;
  }
  

  private deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as unknown as T;
    }
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = this.deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}
