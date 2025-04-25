import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../../../service/dish.service';

@Component({
  selector: 'app-edit-dish',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  dishId = '';
  price='';
  dish = { name: '', price: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    this.dishId = this.route.snapshot.params['id'];
    // Tu peux aussi créer une méthode getDishById() si elle existe côté API
  }

  updateDish() {
    this.dishService.editDish(this.dishId, this.dish).subscribe(() => {
      alert('Plat modifié avec succès !');
      this.router.navigate(['/']);
    });
  }
}
