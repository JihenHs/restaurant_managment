import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // We assume you saved user's role when login.

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data['roles'] as Array<string>;

  if (allowedRoles.includes(userRole!)) {
    return true;
  } else {
    router.navigate(['/unauthorized']); // Create an unauthorized page
    return false;
  }
};
