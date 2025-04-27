import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { DashboardAdminComponent } from './app/Dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardCuisinierComponent } from './app/Dashboard/dashboard-cuisinier/dashboard-cuisinier.component';
import { UnauthorizedComponent } from './app/components/unauthorized/unauthorized.component';

import { RegisterComponent } from './app/register/register.component';
import { AuthService } from './app/service/auth.service';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { DashboardClientComponent } from './app/Dashboard/dashboard-client/dashboard-client.component';
import { LoggedOutGuard } from './app/guards/logged-out.guard';
import { tokenInterceptor } from './app/service/token.interceptor';
import { CommonModule } from '@angular/common';
import { authGuard } from './app/guards/auth.guard'
import { roleGuard } from './app/guards/role.guard'; 
import { DishListComponent } from './app/components/Dish/dish-list/dish-list.component'; // Adjust the import path
const routes: Route[] = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedOutGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dishes-list', component: DishListComponent },

 
  {
    path: 'dashboard-client',
    component: DashboardClientComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['client'] } 
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] } 
  },
  {
    path: 'dashboard-cuisinier',
    component: DashboardCuisinierComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['cuisinier'] } 
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
  

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(CommonModule, FormsModule),
    AuthService,
  ]
}).catch(err => console.error(err));
