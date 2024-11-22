import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'products', component: ProductsComponent },
    { path: '', component: HomeComponent },
     { path: '**', component: PageNotFoundComponent },
];
