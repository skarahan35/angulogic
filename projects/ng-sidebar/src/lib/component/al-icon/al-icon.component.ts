import { Component, HostBinding, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NgSidebarService } from '../../ng-sidebar.service';

/**
 * A component that dynamically loads and displays SVG icons or image sources.
 * If an SVG file is provided, it fetches and sanitizes it to prevent security risks.
 * Otherwise, it renders an image element with the given source.
 *
 * @export
 * @class AlIconComponent
 */
@Component({
  selector: 'al-icon',
  template: ``,
  host: {
    class: 'al-icon',
    style: 'display: flex;',
  },
})
export class AlIconComponent {
  /**
   * Stores the sanitized SVG content or image element.
   * The content is directly bound to the component's `innerHTML`.
   */
  @HostBinding('innerHTML') safeSvg: SafeHtml | undefined;

  /**
   * Stores the image source URL when an image (non-SVG) is provided.
   */
  imgSource?: string;

  /**
   * Sets the source of the icon. If an SVG file is detected, it is loaded and sanitized.
   * Otherwise, an image element is created.
   *
   * @param {string | undefined} content - The source URL or inline SVG content.
   */
  @Input() set icon(content: string | undefined) {
    if (!content) return;

    // Load and sanitize SVG content
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
      // Render as an <img> tag
      this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${content}" />`
      );
    }
  }

  /**
   * Creates an instance of `AlIconComponent`.
   *
   * @param {DomSanitizer} sanitizer - Angular's sanitizer service to bypass security restrictions.
   * @param {NgSidebarService} sidebarService - The sidebar service used to fetch SVG content.
   */
  constructor(
    private sanitizer: DomSanitizer,
    private sidebarService: NgSidebarService
  ) {}
}
