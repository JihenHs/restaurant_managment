import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formData = {
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'client'
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:5000/api/auth/register', this.formData)
      .subscribe({
        next: (response) => {
          // Redirection immédiate vers la page de login avec un message de succès
          this.router.navigate(['/login'], {
            state: {
              successMessage: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
            }
          });
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Cet email est déjà utilisé.';
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          }
          console.error('Erreur lors de l’inscription', error);
        }
      });
  }
}
