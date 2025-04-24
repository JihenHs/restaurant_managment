// logout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private apiUrl = 'http://localhost:5000/api/auth/logout'; // L'URL de ton API backend

  constructor(private http: HttpClient) {}

  // Méthode de déconnexion qui prend le token en paramètre
  logout(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.apiUrl, {}, { headers });
  }
}
