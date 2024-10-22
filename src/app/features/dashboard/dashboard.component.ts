import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  userService = inject(DashboardService);
  users?: any;
  ngOnInit(): void {
    if (this.getUserFromLocalStorage() !== null) {
      this.users = localStorage.getItem('Users');
      this.users = JSON.parse(this.users);
    } else {
      this.userService.getUserData().subscribe(() => {
        this.users = localStorage.getItem('Users'); 
        this.users = JSON.parse(this.users);
      });
    }
  }

  getUserFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem('Users') || '');
    } catch (error) {
      return null;
    }
  };
}
