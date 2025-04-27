import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appRoleVisibility]'
})
export class RoleVisibilityDirective implements OnInit {
  @Input() appRoleVisibility: string[] = [];  

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.getRole();  
    console.log('User Role in Directive:', userRole);  
    console.log('Allowed Roles:', this.appRoleVisibility);  

   
    if (this.appRoleVisibility.includes(userRole)) {
      console.log('Role match, displaying element');
      this.el.nativeElement.style.display = 'block';  
    } else {
      console.log('Role mismatch, hiding element');
      this.el.nativeElement.style.display = 'none'; 
    }
  }
}
