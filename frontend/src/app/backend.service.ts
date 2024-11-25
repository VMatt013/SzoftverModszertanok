import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available globally without needing a module
})
export class BackendService {
  private usersUrl = 'webshop/users';
  private productsUrl = 'webshop/products';
  private ordersUrl = 'webshop/orders'

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${userId}`, updatedUser); // PUT request to update the user
  }


  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productsUrl, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${productId}`);
  }

  updateProduct(productId: number, updatedProduct: any): Observable<any> {
    return this.http.put(`${this.productsUrl}/${productId}`, updatedProduct); // PUT request to update the product
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.ordersUrl);
  }

}

