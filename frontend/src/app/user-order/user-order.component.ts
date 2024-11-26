import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-user-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css'
})
export class UserOrderComponent {
  userId: number = 0;
  orders: any[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackendService) {}

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('userId') || '', 10);

    this.route.paramMap.subscribe(params => {
      const id = params.get('userId');
      this.userId = id !== null ? Number(id) : 0;
      this.loadOrders()
    });

  }

  loadOrders(): void {
    this.backendService.getUserOrders(this.userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
