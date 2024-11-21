import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../backend.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = { id: 0, firstName: '', lastName: '', emailAddress: '' };

  constructor(private userService: BackendService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  addUser(): void {
    if (this.newUser.firstName && this.newUser.lastName && this.newUser.emailAddress) {
      this.userService.addUser(this.newUser).subscribe(
        (addedUser) => {
          this.users.push(addedUser);
      this.newUser = { id: 0, firstName: '', lastName: '', emailAddress: 'asd' }; // Reset the form
    },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      alert('Please fill in all fields');
    }
  }

}
