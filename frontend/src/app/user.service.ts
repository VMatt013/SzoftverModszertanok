import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available globally without needing a module
})
export class UserService {
  private apiUrl = 'webshop/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `http://localhost:8080/webshop/users/${userId}`;
    return this.http.delete<void>(url);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    const url = `http://localhost:8080/webshop/users/${userId}`;
    return this.http.put(url, updatedUser); // PUT request to update the user
  }
}

