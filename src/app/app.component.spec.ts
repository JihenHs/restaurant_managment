import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Ajoute les routes ici
import { HeaderComponent } from './header/header.component'; // Importation du Header standalone

@Component({
  selector: 'app-root',
  standalone: true,  // Ici aussi, on spécifie que le composant est standalone
  imports: [HeaderComponent, RouterModule], // Ajoute les imports ici
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mon Application';
}
