import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userId: number | null = null;

  users: any[] = [];

  constructor(private route: ActivatedRoute, private backendService: BackendService){};

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('userId') || '', 10);

    this.route.paramMap.subscribe(params => {
      const id = params.get('userId');
      this.userId = id !== null ? Number(id) : 0;
      this.loadUser()
    });


  }

  loadUser(): void{

    this.backendService.getUser(this.userId).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  
  
}
