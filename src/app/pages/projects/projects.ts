import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
  host: { class: 'projects-page' }
})
export class Projects {}
