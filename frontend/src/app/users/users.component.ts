import {Component, OnInit, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../backend.service';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './pipes/search.pipe';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true, // Enable standalone mode
  imports: [CommonModule, HttpClientModule, FormsModule, SearchPipe] // Import any required modules

})
export class UsersComponent implements OnInit {
  searchTerm: string = '';
  users: any[] = [];
  newUser = {id: 0, firstName: '', lastName: '', emailAddress: ''};
  filteredUsers: any[] = [];


  constructor(private backendService: BackendService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.backendService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
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
          this.filteredUsers.push(addedUser);
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
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== userId);
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

        const indexInFiltered = this.filteredUsers.findIndex(u => u.id === updatedUser.id);
        if (indexInFiltered !== -1) {
          this.filteredUsers[indexInFiltered] = updatedUser;
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
    this.filteredUsers = [...this.users];
  }

  onSearch(): void {
    const searchValue = this.searchTerm.trim().toLowerCase();
    if (!searchValue) {
      // Reset to full list if search is empty
      this.filteredUsers = [...this.users];
    } else {
      // Filter users based on the search term
      this.filteredUsers = this.users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchValue)
      );
    }
  }

  onInput(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users]; // Reset immediately when input is cleared
    }
  }
}
