import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Import du service AuthService
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // <<< Add this line
  
        // Now redirect depending on role
        if (response.role === 'admin') {
          this.router.navigate(['/dashboard-admin']);
        } else if (response.role === 'cuisinier') {
          this.router.navigate(['/dashboard-cuisinier']);
        } else {
          this.router.navigate(['/dashboard-client']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Erreur inconnue';
      }
    });
  }
}  