import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available globally without needing a module
})
export class BackendService {
  private usersUrl = 'webshop/users';
  private productsUrl = 'webshop/products';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    const url = `http://localhost:8080/webshop/users/${userId}`;
    return this.http.put(url, updatedUser); // PUT request to update the user
  }


  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productsUrl, product);
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.productsUrl}/${productId}`;
    return this.http.delete<void>(url);
  }

  updateProduct(productId: number, updatedProduct: any): Observable<any> {
    const url = `http://localhost:8080/webshop/products/${productId}`;
    return this.http.put(url, updatedProduct); // PUT request to update the product
  }

}

