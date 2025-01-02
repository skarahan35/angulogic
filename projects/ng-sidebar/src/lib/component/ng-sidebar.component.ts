import { AfterViewInit, Component, DoCheck, Input } from '@angular/core';
import { MenuData, SidebarModel } from '../sidebar.model';
import { NgSidebarService } from '../ng-sidebar.service';

@Component({
  selector: 'ng-sidebar',
  templateUrl: './ng-sidebar.component.html',
  styleUrls: ['./ng-sidebar.component.scss'],
})
export class NgSidebarComponent implements AfterViewInit, DoCheck {
  sidebarData!: SidebarModel;
  pinned: boolean = false;

  @Input({ required: true }) set options(val: SidebarModel) {
    this.sidebarData = this.ngSidebarService.initilazeSidebarData(val);
  }
  constructor(public ngSidebarService: NgSidebarService) {}

  ngAfterViewInit(): void {
    this.pinned =
      (this.sidebarData.options.expand &&
        this.sidebarData.options.viewMode === 'hover') ??
      false;
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
    console.log(`${element} clicked`);
  }

  onUserClick(element: 'avatar' | 'name') {
    console.log(`${element} clicked`);
  }

  onSearch(searchText: string & { cancel: boolean }) {
    console.log(`Searching for: ${searchText}`);
  }

  onMenuClick(menuItem: MenuData & { cancel: boolean }) {
    console.log(`Menu item clicked: ${menuItem.name}`);
  }

  onFavoriteClick(favorite: MenuData & { cancel: boolean }) {
    console.log(`Favorite clicked: ${favorite.name}`);
  }

  onToggle() {
    if (this.sidebarData.options.viewMode === 'toggle') {
      this.sidebarData.options.expand = !this.sidebarData.options?.expand;
    } else if (this.sidebarData.options.viewMode === 'hover') {
      this.pinned = !this.pinned;
    }
  }

  onEnter() {
    if (this.sidebarData.options.viewMode === 'hover' && !this.pinned) {
      this.sidebarData.options.expand = true;
    }
  }
  onLeave() {
    if (this.sidebarData.options.viewMode === 'hover' && !this.pinned) {
      this.sidebarData.options.expand = false;
    }
  }
}
