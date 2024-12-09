
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]); // BehaviorSubject to track cart state
  cart$ = this.cartItems.asObservable(); // Observable to share cart state

  constructor() {}

  addToCart(product: any): void {
    const currentCart = this.cartItems.value;
    const productExists = currentCart.some(item => item.id === product.id);
    if (!productExists) {
      this.cartItems.next([...currentCart, product]); // Add new item to cart
      alert(`${product.name} added to the cart!`);
    } else {
      alert(`${product.name} is already in the cart.`);
    }
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartItems.value.filter(item => item.id !== productId);
    this.cartItems.next(updatedCart);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getCartItems(): any[] {
    return this.cartItems.value;
  }
}
