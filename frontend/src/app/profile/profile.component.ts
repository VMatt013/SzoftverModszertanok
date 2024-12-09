import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userId: number = 0;

  users: any = null;

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
        this.users = data[0];
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  

  editUser(user: any): void {
    if(this.users){
      this.users.isEdit = true;
    }
  }

  saveUser(user: any): void {
    if(this.users){
      this.backendService.updateUser(this.users.id, this.users).subscribe(
        (updatedUser) => {
          this.users = updatedUser;
          this.users.isEdit = false;
          console.log("User updated successfully.")
          window.location.reload();
        }, (error) => {
          console.error("Failed to update user: ", error);
        }
      )
    }
  }


}
