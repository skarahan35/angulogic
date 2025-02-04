import {
  Component,
  DoCheck,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  MenuClickEvent,
  MenuData,
  SearchEndEvent,
  SearchStartEvent,
  SidebarData,
  SidebarModel,
} from '../sidebar.model';
import { NgSidebarService } from '../ng-sidebar.service';

/**
 * A dynamic and interactive sidebar component for Angular applications.
 * It supports features such as menu navigation, search, favorites, and theme management.
 *
 * @export
 * @class NgSidebarComponent
 * @implements {DoCheck}
 * @implements {OnInit}
 */
@Component({
  selector: 'ng-sidebar',
  templateUrl: './ng-sidebar.component.html',
  styleUrls: ['./ng-sidebar.component.scss'],
})
export class NgSidebarComponent implements DoCheck, OnInit {
  /**
   * Stores the current sidebar configuration.
   */
  sidebarData!: SidebarModel;

  /**
   * Stores the original sidebar data for deep cloning.
   */
  SIDEBAR_DATA!: SidebarModel;

  /**
   * Stores the list of favorite menu items.
   */
  favorites: MenuData[] = [];

  /**
   * Sets the sidebar options and initializes the sidebar data.
   * Ensures the default theme is applied if not provided.
   *
   * @param {SidebarModel} val - The sidebar configuration model.
   */
  @Input({ required: true }) set options(val: SidebarModel) {
    this.sidebarData = this.ngSidebarService.initilazeSidebarData(val);
    if (!val.options.theme) {
      val.options.theme = 'light';
    }
    this.SIDEBAR_DATA = this.deepClone(this.sidebarData);
  }

  /**
   * Defines a custom template for menu node content.
   */
  @Input() nodeContent?: TemplateRef<any>;

  /**
   * Adds the `.ng-sidebar` class to the component.
   */
  @HostBinding('class.ng-sidebar') ngSidebarClass = true;

  /**
   * Applies the `.collapsed` class when the sidebar is collapsed.
   */
  @HostBinding('class.collapsed') get isCollapsed() {
    return !this.sidebarData.options.expand;
  }

  /**
   * Applies the `.transition` class when the sidebar is transitioning.
   */
  @HostBinding('class.transition') get isTransition() {
    return !this.ngSidebarService.isResizing;
  }

  /**
   * Applies the `.al-dark-theme` class when the dark theme is active.
   */
  @HostBinding('class.al-dark-theme') get isDarkTheme() {
    return this.sidebarData.options.theme === 'dark';
  }

  /**
   * Binds the sidebar's width dynamically based on its expanded state.
   */
  @HostBinding('style.width') get sidebarWidth() {
    return this.sidebarData.options.expand
      ? `${this.sidebarData.options.width}px`
      : this.sidebarData.options.viewMode === 'mobile'
        ? '0px'
        : 'var(--collapse-width)';
  }

  /**
   * Binds the sidebar's max width dynamically.
   */
  @HostBinding('style.maxWidth') get sidebarMaxWidth() {
    return this.sidebarData.options.expand
      ? `${this.sidebarData.options.maxWidth}px`
      : 'unset';
  }

  /**
   * Binds the sidebar's min width dynamically.
   */
  @HostBinding('style.minWidth') get sidebarMinWidth() {
    return this.sidebarData.options.expand
      ? `${this.sidebarData.options.minWidth}px`
      : 'unset';
  }

  /**
   * Creates an instance of `NgSidebarComponent`.
   *
   * @param {NgSidebarService} ngSidebarService - The sidebar service for handling state and actions.
   */
  constructor(public ngSidebarService: NgSidebarService) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   * It updates the list of favorite menu items.
   */
  ngOnInit(): void {
    this.updateFavorites();
  }

  /**
   * Lifecycle hook that detects changes and manages auto-positioning.
   */
  ngDoCheck(): void {
    if (
      this.sidebarData.options.autoPosition !==
      this.ngSidebarService.autoPositionActive
    ) {
      this.sidebarData.options.autoPosition
        ? this.ngSidebarService.setAutoPosition()
        : this.ngSidebarService.destroyAutoPosition();
    }
  }

  /**
   * Handles click events on the banner elements (logo or title).
   * Triggers the `onClick` event if it exists in `bannerOptions`.
   *
   * @param {'logo' | 'title'} element - The clicked banner element.
   */
  protected onBannerClick(element: 'logo' | 'title'): void {
    this.sidebarData.bannerOptions?.onClick?.(element);
  }

  /**
   * Handles click events on the user profile elements (avatar or name).
   * Triggers the `onClick` event if it exists in `userOptions`.
   *
   * @param {'avatar' | 'name'} element - The clicked user profile element.
   */
  protected onUserClick(element: 'avatar' | 'name'): void {
    this.sidebarData.userOptions?.onClick?.(element);
  }

  /**
   * Handles search input events and filters the sidebar menu items.
   * Triggers `onSearchStart` and `onSearchEnd` events if provided.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by the search input.
   */
  protected async onSearch(event: KeyboardEvent): Promise<void> {
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

      if (searchValue.length > 0) {
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

  /**
   * Resets the search input and restores the sidebar menu items.
   * Triggers `onSearchStart` and `onSearchEnd` events if provided.
   *
   * @param {HTMLInputElement} searchInput - The search input element to clear.
   */
  protected async onCancelSearch(searchInput: HTMLInputElement): Promise<void> {
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

  /**
   * Handles click events on menu items.
   * If the item has children, it toggles the node.
   * If the item has a route, it navigates to it.
   *
   * @param {MenuData} node - The clicked menu item.
   * @param {MouseEvent} mouseEvent - The mouse event triggering the click.
   */
  protected async onMenuClick(node: MenuData, mouseEvent: MouseEvent): Promise<void> {
    let event: MenuClickEvent = {
      menuData: node,
      cancel: false,
    };

    await Promise.resolve(node.onClick?.(event));
    await Promise.resolve(this.sidebarData.options.onMenuNodeClick?.(event));

    if (event.cancel) return;

    if (node.children && node.children.length > 0) {
      this.nodeToggle(node, mouseEvent);
    } else if (node.route) {
      this.ngSidebarService.router.navigate([node.route]);
    }
  }

  /**
   * Handles click events on favorite menu items.
   * Triggers the `onClick` event if it exists for the menu item.
   *
   * @param {MenuData & { cancel: boolean }} favorite - The favorite menu item clicked.
   */
  private async onFavoriteClick(
    favorite: MenuData & { cancel: boolean }
  ): Promise<void> {
    let event: MenuClickEvent = {
      menuData: favorite,
      cancel: false,
    };

    await Promise.resolve(favorite.onClick?.(event));

    if (event.cancel) return;
  }

  /**
   * Expands the sidebar when the mouse enters, if viewMode is set to "hover".
   */
  @HostListener('mouseenter')
  protected onEnter(): void {
    if (
      this.sidebarData.options.viewMode === 'hover' &&
      !this.sidebarData.options.pinned
    ) {
      this.sidebarData.options.expand = true;
    }
  }

  /**
   * Collapses the sidebar when the mouse leaves, if viewMode is set to "hover".
   */
  @HostListener('mouseleave')
  protected onLeave(): void {
    if (
      this.sidebarData.options.viewMode === 'hover' &&
      !this.sidebarData.options.pinned
    ) {
      this.sidebarData.options.expand = false;
    }
  }

  /**
   * Toggles the expansion state of a menu node.
   * If the node is already expanded, it collapses it with an animation.
   *
   * @param {MenuData} node - The menu node to toggle.
   * @param {MouseEvent} event - The mouse event triggering the toggle.
   */
  private async nodeToggle(node: MenuData, event: MouseEvent): Promise<void> {
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
      Array.from(parentNode.parentElement!.parentElement!.children)
        .filter(child => child.classList.contains('node'))
        .forEach(child => child.classList.add('out-left'));
      setTimeout(() => {
        node.isExpanded = false;
      }, 300);
    } else {
      setTimeout(() => {
        Array.from(parentNode.parentElement!.parentElement!.children)
          .filter(child => child.classList.contains('node'))
          .forEach(child => child.classList.add('in-left'));
      }, 1);
      node.isExpanded = true;
    }
  }

  /**
   * Adds or removes a menu item from the favorites list.
   *
   * @param {MenuData} node - The menu item to toggle as a favorite.
   */
  protected onFavoriteNode(node: MenuData): void {
    if (!this.favorites.some(fav => fav.name === node.name)) {
      this.favorites.push(node);
    } else {
      this.favorites = this.favorites.filter(fav => fav.name !== node.name);
    }
  }

  /**
   * Checks if a menu item is in the favorites list.
   *
   * @param {string} name - The name of the menu item to check.
   * @returns {boolean} - True if the item is in favorites, false otherwise.
   */
  protected isOnFav(name: string): boolean {
    return this.favorites.some(fav => fav.name === name);
  }

  /**
   * Updates the favorites list by scanning the sidebar menu items.
   */
  private updateFavorites(): void {
    this.favorites = [];
    this.sidebarData.sidebarData.forEach((data: SidebarData) => {
      if (data.data) {
        this.collectFavorites(data.data);
      }
    });
  }

  /**
   * Recursively collects favorite menu items from a list of nodes.
   *
   * @param {MenuData[]} nodes - The list of menu nodes to scan.
   */
  private collectFavorites(nodes: MenuData[]): void {
    nodes.forEach(node => {
      if (node.isFavorited) {
        this.favorites.push(node);
      }
      if (node.children && node.children.length > 0) {
        this.collectFavorites(node.children);
      }
    });
  }

  /**
   * Toggles the pinned state of the sidebar.
   * When pinned, the sidebar remains expanded regardless of hover interactions.
   */
  togglePin(): void {
    this.sidebarData.options.pinned = !this.sidebarData.options.pinned;
  }

  /**
   * Performs a deep clone of an object to prevent reference issues.
   *
   * @template T
   * @param {T} obj - The object to clone.
   * @returns {T} - A deep copy of the input object.
   */
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
