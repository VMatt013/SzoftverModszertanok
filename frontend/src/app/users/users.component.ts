import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../backend.service';
import {FormsModule} from '@angular/forms';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true, // Enable standalone mode
  imports: [CommonModule, HttpClientModule, FormsModule] // Import any required modules
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = {id: 0, firstName: '', lastName: '', emailAddress: ''};
  editingUser: any = null; // Track the user being edited
  backupUser: any = null; // Store original data for cancelation

  constructor(private backendService: BackendService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.backendService.getUsers().subscribe(
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
      this.backendService.addUser(this.newUser).subscribe(
        (addedUser) => {
          this.users.push(addedUser);
          this.newUser = {id: 0, firstName: '', lastName: '', emailAddress: ''}; // Reset the form
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

    this.backendService.deleteUser(userId).subscribe(
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
    this.backendService.updateUser(user.id, user).subscribe(
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

  handleOrdersClick(userId: number): void{
      if(!userId){
        console.error("Invalid user ID")
        return;
      }
      this.router.navigate(['/orders', userId]);
  }
}
