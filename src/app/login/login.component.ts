import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Import du service AuthService
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],  // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Si la connexion est réussie, on enregistre le token
        localStorage.setItem('token', response.token);

        // Redirection manuelle vers une autre page après la connexion
        window.location.href = '/dashboard';  // Simule la redirection vers un dashboard ou autre page
      },
      error: (error) => {
        // Si l'authentification échoue, affiche un message d'erreur
        this.errorMessage = error.error.message || 'Erreur inconnue';
      }
    });
  }
}
