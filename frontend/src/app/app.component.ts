
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { BackendService } from './backend.service';

import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Test';

  userRole: string | null = null;
  cart: any[] = []; // Array to store cart items
  userId: string | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.cartService.cart$.subscribe(cartItems => {
      this.cart = cartItems;
    });
  }

  onLogOut(): void {
    sessionStorage.clear();
    this.router.navigate([`/auth/login`]);
    window.location.reload();
  }

  handleOrdersClick(): void {
    this.userId = sessionStorage.getItem('id');
    if (!this.userId) {
      console.error('Invalid user ID');
      return;
    }
    this.router.navigate([`/users/${this.userId}/order`]);
  }

  handleProfileClick(): void {
    this.userId = sessionStorage.getItem('id');
    if (!this.userId) {
      console.error('Invalid user ID');
      return;
    }
    this.router.navigate([`/users/${this.userId}`]);
  }

placeOrder(): void {
  if (this.cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const userId = sessionStorage.getItem('id'); // Retrieve the user ID from session storage
  if (!userId) {
    alert('User is not logged in!');
    return;
  }

    // 1. Create a new order object
  const newOrder = {
    date: new Date(),
    user_id: userId, // Include the retrieved user ID
    payment_status: 'Pending', // Default status
    status: 'Processing', // Default status
    product_name: this.cart.map(item => item.name).join(', '), // Combine product names into a string
  };

this.backendService.addOrder(newOrder).subscribe(
    (orderResponse) => {
      console.log('Order created successfully:', orderResponse);

      // 3. Iterate through the cart and add each product to the order
      this.cart.forEach((item) => {
        const productOrder = {
          product_id: item.id,
          order_id: orderResponse.id, // Use the order ID from the created order
          amount: item.amount || 1, // Default amount to 1 if not provided
        };

        // Add each product to the order
        this.backendService.addProductOrder(productOrder).subscribe(
          (productOrderResponse) => {
            console.log('Product added to order:', productOrderResponse);
          },
          (error) => {
            console.error('Error adding product to order:', error);
          }
        );
      });

      // 4. Clear the cart after successfully creating the order
      this.cart = [];
      this.cartService.clearCart();
      alert('Your order has been placed successfully!');
    },
    (error) => {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  );
}
  }
