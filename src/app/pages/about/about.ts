import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageEffects } from '../../shared/page-effects';

/**
 * About page: header, About Me, certifications, education, skills and footer.
 * The HTML and SCSS stay in their existing files; this class connects them to Angular.
 */
@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About implements AfterViewInit, OnDestroy {
  private readonly effects = new PageEffects();

  ngAfterViewInit(): void {
    // Run after Angular has placed the page HTML in the DOM.
    this.effects.init({
      reveal: true,
      footer: true,
      certifications: true,
      education: true,
      skills: true,
    });
  }

  ngOnDestroy(): void {
    // Disconnect observers and remove listeners when navigating away.
    this.effects.destroy();
  }
}
