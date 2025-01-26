import { Component, HostBinding, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NgSidebarService } from '../../ng-sidebar.service';

@Component({
  selector: 'al-icon',
  template: ``,
  host: {
    class: 'al-icon',
    style: 'display: flex;width: 1rem;height: 1rem;',
  },
})
export class AlIconComponent {
  @HostBinding('innerHTML') safeSvg: SafeHtml | undefined;

  imgSource?: string;
  @Input() set src(content: string | undefined) {
    if (!content) return;

    if (content.endsWith('.svg')) {
      this.sidebarService
        .loadSvg(content)
        .then(svg => {
          this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
        })
        .catch(error => {
          console.error('Error loading SVG:', error);
          this.safeSvg = undefined;
        });
    } else {
      this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${content}" />`
      );
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private sidebarService: NgSidebarService
  ) {}
}
