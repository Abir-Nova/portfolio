import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
  host: { class: 'projects-page' },
})
export class Projects implements AfterViewInit, OnDestroy {
  // Automatically displays the current year in the footer.
  readonly currentYear = new Date().getFullYear();

  // Stores the observer so it can be cleaned up when leaving the page.
  private observer?: IntersectionObserver;

  // Accesses elements belonging to this component only.
  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // Select the heading and project cards using their existing CSS class.
    const revealElements = this.host.nativeElement.querySelectorAll<HTMLElement>('.reveal');

    // Fallback: show all content if IntersectionObserver isn't supported.
    if (typeof IntersectionObserver === 'undefined') {
      revealElements.forEach((element) => {
        element.classList.add('is-visible');
      });
      return;
    }

    // Detect when elements enter the visible area of the page.
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Activates your existing .reveal.is-visible SCSS animation.
            entry.target.classList.add('is-visible');

            // No need to observe an element after it has appeared.
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    // Start observing every element marked with .reveal.
    revealElements.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  ngOnDestroy(): void {
    // Prevents the observer from lingering after navigating away.
    this.observer?.disconnect();
  }
}
