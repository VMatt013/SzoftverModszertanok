import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Enable standalone mode
  imports: [CommonModule, HttpClientModule, FormsModule] // Import any required modules
})
export class AppComponent implements OnInit {
  users: any[] = [];
  newUser = { id: 0, firstName: '', lastName: '', emailAddress: '' };

  constructor(private userService: UserService) {}

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
