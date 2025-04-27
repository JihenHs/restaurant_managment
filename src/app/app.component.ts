import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], 
  template:  `
  <app-header></app-header> 
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userRole: string | null = null; 

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.loadUserRole();
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  loadUserRole(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = localStorage.getItem('role');
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); 
      localStorage.removeItem('role'); 
      this.userRole = null;             
      this.router.navigate(['/login']); 
    }
  }
}
