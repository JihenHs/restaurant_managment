import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DishService } from '../../../service/dish.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  imports: [],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.css'
})
export class AddDishComponent {
  dishForm: FormGroup;

  constructor(private fb: FormBuilder, private dishService: DishService, private router: Router) {
    this.dishForm = this.fb.group({
      name: [''],
      description: [''],
      category: [''],
      imageUrl: [''],
      createdBy: [''],
      price: [0]
    });
  }

  submit() {
    this.dishService.addDish(this.dishForm.value).subscribe(() => {
      this.router.navigate(['/dishes']);
    });
  }
}
