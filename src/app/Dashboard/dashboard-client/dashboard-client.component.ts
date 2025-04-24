import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { LogoutService } from '../../service/logout.service'

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [CommonModule],  // Ajouter CommonModule ici
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent {
  private logoutService = inject(LogoutService);

  // Variable pour vérifier si l'utilisateur est connecté
  isLoggedIn: boolean = false;

  constructor() {
    // Vérifier la présence du token dans localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;  // Si un token est présent, l'utilisateur est connecté
  }

  onLogout() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logoutService.logout(token).subscribe({
        next: () => {
          // Supprimer le token localement
          localStorage.removeItem('token');

          // Rediriger vers la page de connexion
          window.location.href = '/login';
        },
        error: (err) => {
          // En cas d'erreur, afficher un message ou gérer l'erreur
          console.error('Erreur lors de la déconnexion', err);
        }
      });
    }
  }
}
