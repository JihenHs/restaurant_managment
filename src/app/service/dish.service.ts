import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl = 'http://localhost:5000/api/dish';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  addDish(dish: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, dish);
  }

  editDish(id: string, dish: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit/${id}`, dish);
  }

  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
