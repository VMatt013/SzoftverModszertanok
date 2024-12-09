import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Test';

  userRole: string | null = null;
  cart: any[] = []; // Array to store cart items
  userId: string | null = null;

  constructor(private router: Router, private cartService: CartService, private backendService: BackendService) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.cartService.cart$.subscribe(cartItems => {
    this.cart = cartItems;
    });
  }

  onLogOut(){
    sessionStorage.clear();
    this.router.navigate([`/auth/login`]);
    window.location.reload();
  }

  handleOrdersClick(): void{
    this.userId = sessionStorage.getItem('id');
    if(!this.userId){
      console.error("Invalid user ID")
      return;
    }
    this.router.navigate([`/users/${this.userId}/order`]);
  }

  handleProfileClick(): void{
    this.userId = sessionStorage.getItem('id');
    if(!this.userId){
      console.error("Invalid user ID")
      return;
    }
    this.router.navigate([`/users/${this.userId}`]);
  }


 placeOrder(): void {
    if (this.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // 1. Create a new order object
    const newOrder = {
      date: new Date(),
      user_id: 1,  // Assuming a logged-in user with user_id = 1
      payment_status: 'Pending',  // Default status
      status: 'Processing',  // Default status
      product_name: this.cart.map(item => item.name).join(', '),  // Combine product names into a string
    };

    // 2. Create the new order using the backendService
    this.backendService.addOrder(newOrder).subscribe(
      (orderResponse) => {
        // 3. After order creation, loop through the cart to add products to the order
        this.cart.forEach((item) => {
          const productOrder = {
            product_id: item.id,
            order_id: orderResponse.id,
            amount: item.amount || 1,  // Default to 1 if the amount is not defined
          };

          // Add product to the order
          this.backendService.addProductOrder(productOrder).subscribe(
            (productOrderResponse) => {
              console.log('Product added to order:', productOrderResponse);
            },
            (error) => {
              console.error('Error adding product to order:', error);
            }
          );
        });

        // 4. After successfully placing the order and associating products, clear the cart
        this.cart = [];
        alert('Your order has been placed successfully!');
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('An error occurred while placing the order.');
      }
    );
  }



}

