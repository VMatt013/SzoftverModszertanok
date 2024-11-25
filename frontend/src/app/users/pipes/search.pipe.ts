import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true, // Ensure compatibility with standalone components
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) return items;

    searchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchTerm)
    );
  }
}
