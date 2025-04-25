import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule ], 
  template: `
    <div>
      <h1>Welcome to My App</h1>
      <nav>
        <ng-container *ngIf="!isLoggedIn()">
          <a routerLink="/login">Login</a> |
          <a routerLink="/register">Register</a>
        </ng-container>
        <ng-container *ngIf="isLoggedIn()">
          <a routerLink="/dashboard">Dashboard</a> |
        </ng-container>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  
isLoggedIn(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('token') !== null;
  }
  return false;
}
 
}
