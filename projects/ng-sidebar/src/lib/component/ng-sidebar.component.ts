import { AfterViewInit, Component, DoCheck, Input } from '@angular/core';
import {
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

  @Input({ required: true }) set options(val: SidebarModel) {
    this.sidebarData = this.ngSidebarService.initilazeSidebarData(val);
  }
  constructor(public ngSidebarService: NgSidebarService) {}

  ngAfterViewInit(): void {}

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
    console.log(`${element} clicked`);
  }

  onUserClick(element: 'avatar' | 'name') {
    console.log(`${element} clicked`);
  }

  async onSearch(event: KeyboardEvent) {
    const element = event.currentTarget as HTMLInputElement;
    let searchStartEvent: SearchStartEvent = {
      nativeElement: element,
      searchValue: element.value,
      cancel: false,
    };
    if (this.sidebarData.searchOptions?.onSearchStart) {
      await this.sidebarData.searchOptions.onSearchStart(searchStartEvent);
    }
    if (!searchStartEvent.cancel) {
      /*
        SEARCH PROCCESS WİLL COME
      */
      if (this.sidebarData.searchOptions?.onSearchEnd) {
        let searchEndEvent: SearchEndEvent = {
          menuData: [],
        };
        this.sidebarData.searchOptions.onSearchEnd(searchEndEvent);
      }
    }
  }

  onMenuClick(menuItem: MenuData & { cancel: boolean }) {
    console.log(`Menu item clicked: ${menuItem.name}`);
  }

  onFavoriteClick(favorite: MenuData & { cancel: boolean }) {
    console.log(`Favorite clicked: ${favorite.name}`);
  }

  onToggle() {
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
  }
}
