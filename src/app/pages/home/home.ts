
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageEffects } from '../../shared/page-effects';

/**
 * Home page:
 * Header, hero, About Me preview, animated CTA and footer.
 */
@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
  host: { class: 'home-page' }
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('closingSection')
  private closingSection?: ElementRef<HTMLElement>;

  private readonly effects = new PageEffects();

  private closingObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    // Keep the existing shared reveal and footer effects.
    this.effects.init({
      reveal: true,
      footer: true
    });

    // Add the entrance animation for the new CTA section.
    this.initClosingAnimation();

    // Update the year in the existing footer.
    this.updateFooterYear();

    // Make the existing Back to top button functional.
    this.initBackToTop();
  }

  private initClosingAnimation(): void {
    const section = this.closingSection?.nativeElement;

    if (!section) {
      return;
    }

    // Fallback: show the content if IntersectionObserver is unavailable.
    if (typeof IntersectionObserver === 'undefined') {
      section.classList.add('is-closing-visible');
      return;
    }

    this.closingObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-closing-visible');

            // Play the reveal once rather than on every scroll.
            this.closingObserver?.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    this.closingObserver.observe(section);
  }

  private updateFooterYear(): void {
    const yearElement = document.querySelector<HTMLElement>(
      '[data-current-year]'
    );

    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  private initBackToTop(): void {
    const button = document.querySelector<HTMLButtonElement>(
      '.footer-back-top'
    );

    if (!button) {
      return;
    }

    button.addEventListener('click', this.scrollToTop);
  }

  private readonly scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });
  };

  ngOnDestroy(): void {
    // Stop observing the CTA when navigating away.
    this.closingObserver?.disconnect();

    // Remove the footer button listener to avoid memory leaks.
    const button = document.querySelector<HTMLButtonElement>(
      '.footer-back-top'
    );

    button?.removeEventListener('click', this.scrollToTop);

    // Preserve the cleanup provided by the shared effects service.
    this.effects.destroy();
  }
}
