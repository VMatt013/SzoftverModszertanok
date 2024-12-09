import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available globally without needing a module
})
export class BackendService {
  private token = sessionStorage.getItem("token");
  private usersUrl = 'webshop/users';
  private productsUrl = 'webshop/products';
  private ordersUrl = 'webshop/orders'
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
    }

  getUser(userId: number | null): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, user, 
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }});
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    );
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${userId}`, updatedUser,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    ); // PUT request to update the user
  }

  getUserOrders(userId: number): Observable<any>{
    return this.http.get(`${this.usersUrl}/${userId}/order`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }


  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productsUrl, product,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    );
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${productId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    );
  }

  updateProduct(productId: number, updatedProduct: any): Observable<any> {
    return this.http.put(`${this.productsUrl}/${productId}`, updatedProduct,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    ); // PUT request to update the product
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.ordersUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    );
  }

}

