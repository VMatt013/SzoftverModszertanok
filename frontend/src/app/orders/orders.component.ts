import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  userId: string | null = null;
  orders: any[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackendService) {}

  ngOnInit(): void {
    //this.userId = this.route.snapshot.paramMap.get('userId');

    /*this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });*/
    this.loadOrders();
  }

  loadOrders(): void {
    this.backendService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
