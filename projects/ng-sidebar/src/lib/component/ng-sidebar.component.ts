import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { sidebarModel } from '../menu-data';
import { MenuData, SidebarModel } from '../sidebar.model';
import { NgSidebarService } from '../ng-sidebar.service';

@Component({
  selector: 'ng-sidebar',
  templateUrl: './ng-sidebar.component.html',
  styleUrls: ['./ng-sidebar.component.scss'],

})
export class NgSidebarComponent implements AfterViewInit, OnDestroy {
  sidebarModel: SidebarModel;
  @ViewChild('sidebar') sidebar: any;
  pinned: boolean = (sidebarModel.options.expand && sidebarModel.options.viewMode === 'hover') ?? false;
  private observer!: MutationObserver;


  constructor() {
    this.sidebarModel = sidebarModel;
    console.log(this.sidebarModel);
  }
  ngAfterViewInit(): void {
    this.sidebar
    // Array.from(this.sidebar.nativeElement.parentElement.parentElement.children).forEach((i:any) => {
    //   if (this.sidebar.nativeElement.parentElement !== i) {
    //     i.classList.add('main-content');
    //   }
    // });

    const divElement = this.sidebar.nativeElement;

    if (!divElement) {
      console.error('Resizable div not found!');
      return;
    }
    document.documentElement.style.setProperty('--sidebar-width', divElement.style.width)
    this.observer = new MutationObserver(() => {
      const width = divElement.offsetWidth;
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    });

    this.observer.observe(divElement, {
      attributeFilter: ['style'],
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
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
    if (this.sidebarModel.options.viewMode === 'toggle') {
      this.sidebarModel.options.expand = !this.sidebarModel.options?.expand;
    } else if (this.sidebarModel.options.viewMode === 'hover') {
      this.pinned = !this.pinned;
    }
  }

  onEnter() {
    if (this.sidebarModel.options.viewMode === 'hover' && !this.pinned) {
      this.sidebarModel.options.expand = true;
    }
  }
  onLeave() {
    if (this.sidebarModel.options.viewMode === 'hover' && !this.pinned) {
      this.sidebarModel.options.expand = false
    }

  }
}
