import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<main class="app-root">
    <router-outlet></router-outlet>
  </main>`,
  styleUrls: ['./app.css']
})
export class App {}
