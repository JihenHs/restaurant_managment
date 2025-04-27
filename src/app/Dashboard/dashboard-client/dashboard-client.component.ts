import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { LogoutService } from '../../service/logout.service'

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [CommonModule],  // Ajouter CommonModule ici
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent {
}