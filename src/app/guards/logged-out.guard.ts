import { CanActivateFn } from '@angular/router';

export const LoggedOutGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');

  if (token) {
    // Redirige l'utilisateur connecté vers dashboard
    window.location.href = '/dashboard';
    return false;
  }

  return true;
};
