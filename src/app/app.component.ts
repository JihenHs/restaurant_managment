import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutService } from '../../src/app/service/logout.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  template: `
    <div>
      <h1>Welcome to My App</h1>
      <nav>
        <!-- Affiche Login & Register si NON connecté -->
        <ng-container *ngIf="!isLoggedIn()">
          <a routerLink="/login">Login</a> |
          <a routerLink="/register">Register</a>
        </ng-container>

        <!-- Affiche Dashboard & Logout si connecté -->
        <ng-container *ngIf="isLoggedIn()">
          <a routerLink="/dashboard">Dashboard</a> |
          <a (click)="onLogout()" style="cursor: pointer;">Logout</a>
        </ng-container>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private logoutService: LogoutService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  onLogout() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logoutService.logout(token).subscribe(
        (response) => {
          console.log('Déconnexion réussie:', response);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de la déconnexion:', error);
        }
      );
    } else {
      console.error('Aucun token trouvé');
    }
  }
}
