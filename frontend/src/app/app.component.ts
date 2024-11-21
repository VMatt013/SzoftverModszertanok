import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import {FormsModule} from '@angular/forms';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
  editingUser: any = null; // Track the user being edited
  backupUser: any = null; // Store original data for cancelation

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
      this.newUser = { id: 0, firstName: '', lastName: '', emailAddress: '' }; // Reset the form
    },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      alert('Please fill in all fields');
    }
  }
  deleteUser(userId: number): void {
    if (!userId) {
      console.error('Invalid User ID');
      return;
    }

    this.userService.deleteUser(userId).subscribe(
      () => {
        // Remove the deleted user from the list
        this.users = this.users.filter((user) => user.id !== userId);
        console.log(`User with ID ${userId} deleted successfully.`);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(user: any): void {
    this.users.forEach(u => u.isEdit = false); // Close other edits
    user.isEdit = true;
  }

  saveUser(user: any): void {
    this.userService.updateUser(user.id, user).subscribe(
      (updatedUser) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser; // Update local data
        }
        user.isEdit = false; // Exit edit mode
        console.log('User updated successfully:', updatedUser);
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
      }
    );
  }
  cancelEdit(): void {
    this.loadUsers(); // Reload users to discard changes
    this.users.forEach(u => u.isEdit = false); // Exit edit mode
  }
}
