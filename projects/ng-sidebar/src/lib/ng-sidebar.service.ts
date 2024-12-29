import { ElementRef, Injectable } from '@angular/core';
import { ResizeEvent, SidebarModel, SidebarOptions } from './sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class NgSidebarService {
  auotoPositionActive: boolean = false;
  isResizing: boolean = false;
  private observer!: MutationObserver;

  setAutoPosition() {
    const divElement = document.getElementById('ng-sidebar');
    if (!divElement) {
      console.error('Resizable div not found!');
      return;
    }
    if (!document.body.classList.contains('auto-position')) {
      document.body.classList.add('auto-position');
    }

    document.documentElement.style.setProperty('--sidebar-width', divElement.style.width)
    this.observer = new MutationObserver(() => {
      const width = divElement.offsetWidth;
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    });

    this.observer.observe(divElement, {
      attributeFilter: ['style'],
    });

    this.auotoPositionActive = true;
    console.log('Auto position enabled');
  }

  destroAutoPosition() {
    this.observer.disconnect();
    if (document.body.classList.contains('auto-position')) {
      document.body.classList.remove('auto-position');
    }
    this.auotoPositionActive = false;
    console.log('Auto position disabled');
  }

  resize(sidebarData: SidebarModel) {
    this.isResizing = true;
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
}
