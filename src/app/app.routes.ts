import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardClientComponent } from './Dashboard/dashboard-client/dashboard-client.component';  // Your dashboard component
import { DishListComponent } from './components/Dish/dish-list/dish-list.component';
import { AddDishComponent } from './components/Dish/add-dish/add-dish.component';
import { EditDishComponent } from './components/Dish/edit-dish/edit-dish.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { adminCookGuard } from './guards/admin-cook.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardClientComponent },  // Add this route
  { path: 'dishes', component: DishListComponent },
  { path: 'add-dish', component: AddDishComponent, canActivate: [adminCookGuard] },
  { path: 'edit-dish/:id', component: EditDishComponent, canActivate: [adminCookGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  
];
