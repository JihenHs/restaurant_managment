import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,  // Ajoute l'option standalone ici
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Vérifie si un utilisateur est connecté (par exemple, en vérifiant un token)
    this.isLoggedIn = localStorage.getItem('auth_token') !== null;
  }

  logout(): void {
    // Supprime le token et redirige l'utilisateur
    localStorage.removeItem('auth_token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
