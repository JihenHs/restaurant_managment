import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this.loadUserRole();
  }

  isUserLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = localStorage.getItem('token') !== null;
      return this.isLoggedIn;
    }
    return false;
  }

  loadUserRole(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = localStorage.getItem('role');
    }
  }

  isAdminOrCuisinier(): boolean {
    this.userRole = localStorage.getItem('role');
    return this.userRole === 'admin' || this.userRole === 'cuisinier';
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.userRole = null;
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
