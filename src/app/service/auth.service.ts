import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getRole(): string {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log('Retrieved Role:', parsedData.role);  // Debugging log
      return parsedData.role;
    }
    console.log('No user data found!');
    return '';
  }
  

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasAccess(): boolean {
    const role = this.getRole();
    return role === 'admin' || role === 'cuisinier';
  }

  private apiUrl = 'http://localhost:5000/api/auth/login';  // Ton endpoint d'API

   constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  
}

