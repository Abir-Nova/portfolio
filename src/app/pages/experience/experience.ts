import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageEffects } from '../../shared/page-effects';

/** Experience page: header, experience section and footer. */
@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-experience',
  styleUrl: './experience.scss',
  templateUrl: './experience.html',
})
export class Experience implements AfterViewInit, OnDestroy {
  private readonly effects = new PageEffects();

  ngAfterViewInit(): void {
    this.effects.init({ reveal: true, footer: true });
  }

  ngOnDestroy(): void {
    this.effects.destroy();
  }
}
