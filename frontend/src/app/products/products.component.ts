import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../backend.service';
import {FormsModule} from '@angular/forms';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {id: 0, size: '', weight: '', name: '', price: ''};
  editingProduct: any = null;
  backupProduct: any = null;

  constructor(private userService: BackendService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.userService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct(): void {
    if (this.newProduct.size && this.newProduct.weight && this.newProduct.name && this.newProduct.price) {
      this.userService.addProduct(this.newProduct).subscribe(
        (addedProduct) => {
          this.products.push(addedProduct);
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

    this.userService.deleteProduct(productId).subscribe(
      () => {
        // Remove the deleted product from the list
        this.products = this.products.filter((product) => product.id !== productId);
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
    this.userService.updateProduct(product.id, product).subscribe(
      (updatedProduct) => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct; // Update local data
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
  }

}
