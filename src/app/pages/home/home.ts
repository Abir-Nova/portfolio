import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageEffects } from '../../shared/page-effects';

/** Home page: header, hero, About Me preview and footer. */
@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly effects = new PageEffects();

  ngAfterViewInit(): void {
    this.effects.init({ reveal: true, footer: true });
  }

  ngOnDestroy(): void {
    this.effects.destroy();
  }
}
