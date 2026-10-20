import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageEffects } from '../../shared/page-effects';

/** Contact page: header, contact section/form and footer. */
@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact implements AfterViewInit, OnDestroy {
  private readonly effects = new PageEffects();

  ngAfterViewInit(): void {
    this.effects.init({
      reveal: true,
      footer: true,
      contact: true,
      contactForm: true,
    });
  }

  ngOnDestroy(): void {
    this.effects.destroy();
  }
}
