import { Component } from '@angular/core';
import { DishService } from '../../../service/dish.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  imports: [],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent {
  dishes: any[] = [];
  hasAccess = false;

  constructor(private dishService: DishService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.hasAccess = this.auth.hasAccess();
    this.dishService.getAllDishes().subscribe(data => {
      this.dishes = data;
    });
  }

  edit(id: string) {
    this.router.navigate(['/edit-dish', id]);
  }

  delete(id: string) {
    if (confirm('Supprimer ce plat ?')) {
    this.dishService.deleteDish(id).subscribe(() => {
      this.dishes = this.dishes.filter(d => d._id !== id);
    });}
  }
}

