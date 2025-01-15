import { AfterViewInit, Component, DoCheck, Input } from '@angular/core';
import {
  ExpandClickEvent,
  MenuClickEvent,
  MenuData,
  SearchEndEvent,
  SearchStartEvent,
  SidebarModel,
} from '../sidebar.model';
import { NgSidebarService } from '../ng-sidebar.service';

@Component({
  selector: 'ng-sidebar',
  templateUrl: './ng-sidebar.component.html',
  styleUrls: ['./ng-sidebar.component.scss'],
})
export class NgSidebarComponent implements AfterViewInit, DoCheck {
  sidebarData!: SidebarModel;
  SIDEBAR_DATA!: SidebarModel;

  @Input({ required: true }) set options(val: SidebarModel) {
    this.sidebarData = this.ngSidebarService.initilazeSidebarData(val);
    this.SIDEBAR_DATA = JSON.parse(JSON.stringify(this.sidebarData));
  }
  constructor(public ngSidebarService: NgSidebarService) { }

  ngAfterViewInit(): void { }

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
      await this.sidebarData.searchOptions.onSearchStart(searchStartEvent);
    }

    if (!searchStartEvent.cancel) {
      let filteredResults: MenuData[] = [];
      if (element.value.length > 0) {
        filteredResults = this.ngSidebarService.searchByName(
          JSON.parse(JSON.stringify(this.SIDEBAR_DATA)),
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
        this.sidebarData = JSON.parse(JSON.stringify(this.SIDEBAR_DATA));
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
    if (searchInput.value === '') return
    searchInput.value = '';

    let searchStartEvent: SearchStartEvent = {
      nativeElement: searchInput,
      searchValue: searchInput.value,
      cancel: false,
    };

    if (this.sidebarData.searchOptions?.onSearchStart) {
      await this.sidebarData.searchOptions.onSearchStart(searchStartEvent);
    }

    if (!searchStartEvent.cancel) {
      this.sidebarData = JSON.parse(JSON.stringify(this.SIDEBAR_DATA));
      if (this.sidebarData.searchOptions?.onSearchEnd) {
        let searchEndEvent: SearchEndEvent = {
          menuData: this.SIDEBAR_DATA.sidebarData,
        };
        this.sidebarData.searchOptions.onSearchEnd(searchEndEvent);
      }
    }
  }

  onMenuClick(menuItem: MenuData & { cancel: boolean }) {
    let event: MenuClickEvent = {
      menuData: menuItem,
      cancel: false,
    }

    menuItem.onClick?.(event);
    if(event.cancel) return;
  }

  onFavoriteClick(favorite: MenuData & { cancel: boolean }) {
    let event: MenuClickEvent = {
      menuData: favorite,
      cancel: false,
    }

    favorite.onClick?.(event);
    if(event.cancel) return;
  }

  onToggle(isExpand:boolean | undefined) {
    let event: ExpandClickEvent = {
      cancel: false,
      click: true,
    };
    if(isExpand) {
      this.sidebarData.options.onCollapse?.(event);
    } else {
    this.sidebarData.options.onExpand?.(event);
    }
    if(event.cancel) return;
    this.sidebarData.options.expand = !this.sidebarData.options?.expand;
  }

  onEnter() {
    if (
      this.sidebarData.options.viewMode === 'hover' &&
      !this.sidebarData.options.pinned
    ) {
      this.sidebarData.options.expand = true;
    }
  }
  onLeave() {
    if (
      this.sidebarData.options.viewMode === 'hover' &&
      !this.sidebarData.options.pinned
    ) {
      this.sidebarData.options.expand = false;
    }
  }

  onPin() {
    this.sidebarData.options.pinned = !this.sidebarData.options.pinned;
  }

  nodeTogglerClick(node: MenuData, event: MouseEvent) {
    const nodeElement = event.currentTarget as HTMLElement;
    const parentNode = nodeElement.parentElement;
    if (node.isExpanded) {
      (nodeElement.firstChild as HTMLElement).classList.remove('expand');
      Array.from(parentNode!.parentElement!.children)
        .filter(child => child.classList.contains('node'))
        .forEach(child => child.classList.add('out-top'));
      setTimeout(() => {
        node.isExpanded = !node.isExpanded;
      }, 300);
    } else {
      node.isExpanded = !node.isExpanded;
    }
    let nodeTogglerClickEvent: MenuClickEvent = {
      menuData: node,
      cancel: false,
    }
    node.onToggle?.(nodeTogglerClickEvent);
    if(nodeTogglerClickEvent.cancel) return;
  }
}
