import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct',
  standalone: true, // Ensure compatibility with standalone components
  pure: false,
})
export class SearchProductPipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
      return products; // Return full list if no search term is provided
    }

    // Convert search term to lowercase for case-insensitive matching
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter products based on the `name` property
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
