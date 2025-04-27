import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:5000/api/dishes';

  constructor(private http: HttpClient) {}

  // Fetch all dishes (accessible to all users)
  getAllDishes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Add a new dish (restricted to admin/cuisinier)
  addDish(dish: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, dish, this.getAuthHeaders());
  }

  // Edit a dish (restricted to admin/cuisinier)
  editDish(id: string, dish: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${id}`, dish, this.getAuthHeaders());
  }

  // Delete a dish (restricted to admin/cuisinier)
  deleteDish(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, this.getAuthHeaders());
  }

  // Get authentication headers with token
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }
}
