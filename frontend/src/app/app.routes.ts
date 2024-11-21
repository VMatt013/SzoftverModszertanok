import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: '', component: HomeComponent },
     { path: '**', component: PageNotFoundComponent },

];
