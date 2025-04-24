import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { AuthService } from './app/service/auth.service';
import { FormsModule } from '@angular/forms';

import { DashboardClientComponent } from './app/Dashboard/dashboard-client/dashboard-client.component';
import { LoggedOutGuard } from './app/guards/logged-out.guard';
const routes: Route[] = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedOutGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardClientComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    AuthService,
    FormsModule
  ]
}).catch(err => console.error(err));
