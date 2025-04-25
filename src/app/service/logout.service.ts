// logout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private apiUrl = 'http://localhost:5000/api/auth/logout'; // L'URL de ton API backend

  constructor(private http: HttpClient, private router: Router) {}

  logout(token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(this.apiUrl, {}, { headers });
  }


  }

