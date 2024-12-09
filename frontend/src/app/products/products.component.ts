import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../backend.service';
import {FormsModule} from '@angular/forms';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {SearchProductPipe} from './pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, SearchProductPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  searchTerm: string = '';
  products: any[] = [];
  newProduct: any = {id: 0, size: '', weight: '', name: '', price: ''};
  filteredProducts: any[] = [];
  userRole: string | null = null;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.userRole = sessionStorage.getItem('role');
  }

  loadProducts(): void {
    this.backendService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct(): void {
    if (this.newProduct.size && this.newProduct.weight && this.newProduct.name && this.newProduct.price) {
      this.backendService.addProduct(this.newProduct).subscribe(
        (addedProduct) => {
          this.products.push(addedProduct);
          this.filteredProducts.push(addedProduct);
          this.newProduct = {id: 0, size: '', weight: '', name: '', price: ''};
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    } else {
      alert('Please fill in all fields');
    }
  }

  deleteProduct(productId: number): void {
    if (!productId) {
      console.error('Invalid Product ID');
      return;
    }

    this.backendService.deleteProduct(productId).subscribe(
      () => {
        // Remove the deleted product from the list
        this.products = this.products.filter((product) => product.id !== productId);
        this.filteredProducts = this.filteredProducts.filter((product) => product.id !== productId);
        console.log(`Product with ID ${productId} deleted successfully.`);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  editProduct(product: any): void {
    this.products.forEach(p => p.isEdit = false); // Close other edits
    product.isEdit = true;
  }

  saveProduct(product: any): void {
    this.backendService.updateProduct(product.id, product).subscribe(
      (updatedProduct) => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct; // Update local data
        }

        const indexInFiltered = this.filteredProducts.findIndex(u => u.id === updatedProduct.id);
        if (indexInFiltered !== -1) {
          this.filteredProducts[indexInFiltered] = updatedProduct;
        }

        product.isEdit = false; // Exit edit mode
        console.log('Product updated successfully:', updatedProduct);
      },
      (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
      }
    );
  }

  cancelEdit(): void {
    this.loadProducts();
    this.products.forEach(p => p.isEdit = false);
    this.filteredProducts = [...this.products];
  }
  onSearch(): void {
    const searchValue = this.searchTerm.trim().toLowerCase();
    if (!searchValue) {
      // Reset to the full list if the search is empty
      this.filteredProducts = [...this.products];
    } else {
      // Filter products based on the `name` property
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
      );
    }
  }

  onInput(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products]; // Reset immediately when input is cleared
    }
  }
}
