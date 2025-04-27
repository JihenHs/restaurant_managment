import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appRoleVisibility]'
})
export class RoleVisibilityDirective implements OnInit {
  @Input() appRoleVisibility: string[] = [];  // List of roles that can view the element

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.getRole();  // Get the current user's role
    console.log('User Role in Directive:', userRole);  // Debugging log
    console.log('Allowed Roles:', this.appRoleVisibility);  // Debugging log

    // Check if the user's role is in the allowed roles array
    if (this.appRoleVisibility.includes(userRole)) {
      console.log('Role match, displaying element');
      this.el.nativeElement.style.display = 'block';  // Show element if role matches
    } else {
      console.log('Role mismatch, hiding element');
      this.el.nativeElement.style.display = 'none';  // Hide element if role doesn't match
    }
  }
}
