import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishService } from '../../../service/dish.service';
import { AuthService } from '../../../service/auth.service';
import { RouterModule } from '@angular/router';
import { RoleVisibilityDirective } from '../../../Directive/role-visibility.directive'; // Import the directive

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RoleVisibilityDirective],
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: any[] = [];
  userRole: string = '';  // Contient le rôle de l'utilisateur
  addDishForm!: FormGroup;
  showAddDishForm: boolean = false;

  constructor(
    private dishService: DishService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Récupère le rôle de l'utilisateur au démarrage
    this.userRole = this.authService.getRole(); // Récupère le rôle via le service
    console.log('Rôle de l\'utilisateur:', this.userRole); // Vérification du rôle dans la console

    this.dishService.getAllDishes().subscribe(
      (data) => this.dishes = data,
      (error) => console.error('Erreur lors du fetch des plats:', error)
    );

    // Initialisation du formulaire d'ajout de plat
    this.addDishForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  // Vérifie si l'utilisateur peut éditer ou supprimer un plat
  canEditOrDelete(): boolean {
    const userRole = this.authService.getRole();
    return userRole === 'admin' || userRole === 'cuisinier'; // Only show buttons for admin and cuisinier
  }

  toggleAddDishForm(): void {
    this.showAddDishForm = !this.showAddDishForm;
    if (!this.showAddDishForm) {
      this.addDishForm.reset();
    }
  }

  onAddDish(): void {
    if (this.addDishForm.valid) {
      this.dishService.addDish(this.addDishForm.value).subscribe(
        (newDish) => {
          this.dishes.push(newDish);
          this.toggleAddDishForm();
        },
        (error) => console.error('Erreur lors de l\'ajout du plat:', error)
      );
    }
  }

  editDish(dish: any): void {
    alert(`Edition en cours pour: ${dish.name}`);
  }

  deleteDish(dishId: string): void {
    if (confirm('Es-tu sûr de vouloir supprimer ce plat ?')) {
      this.dishService.deleteDish(dishId).subscribe(
        () => this.dishes = this.dishes.filter(d => d._id !== dishId),
        (error) => console.error('Erreur lors de la suppression:', error)
      );
    }
  }
}
