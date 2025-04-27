import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardClientComponent } from './Dashboard/dashboard-client/dashboard-client.component';  // Your dashboard component

import { DashboardAdminComponent } from './Dashboard/dashboard-admin/dashboard-admin.component';  // Your dashboard component
import { DashboardCuisinierComponent } from './Dashboard/dashboard-cuisinier/dashboard-cuisinier.component';  // Your dashboard component


import { DishListComponent } from './components/Dish/dish-list/dish-list.component'; // Correct path to your component
import { AddDishComponent } from './components/Dish/add-dish/add-dish.component';
import { EditDishComponent } from './components/Dish/edit-dish/edit-dish.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { adminCookGuard } from './guards/admin-cook.guard';
import { roleGuard } from './guards/role.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-client', component: DashboardClientComponent },  
  { path: 'dashboard-admin', component: DashboardAdminComponent },  
  { path: 'dashboard-cuisinier', component: DashboardCuisinierComponent },  


  { path: 'add-dish', component: AddDishComponent },
  { path: 'edit-dish/:id', component: EditDishComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dish-list',
    component: DishListComponent,
    canActivate: [roleGuard], // Protect this route with the roleGuard
    data: {
      roles: ['admin', 'cuisinier'] // Only admin and cuisinier can access this route
    }}




];
