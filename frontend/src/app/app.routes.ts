import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RegistrationComponent} from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:userId', component: ProfileComponent},
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent},
    { path: 'auth/login', component: LoginComponent},
    { path: 'auth/registration', component: RegistrationComponent},
    { path: 'users/:userId/order', component: UserOrderComponent },
    { path: '**', component: PageNotFoundComponent },
];
