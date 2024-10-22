import {
  Component,
  computed,
  inject,
  Input,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UserDetails } from '../../modals/user-detail.interface';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  user = input.required<UserDetails>();
  router = inject(Router);
  address = computed(() => {
    return `${this.user()?.address?.street} , ${
      this.user()?.address?.suite
    } , ${this.user()?.address?.city} , ${this.user()?.address?.zipcode}`;
  });
  // @Input() user?: UserDetails

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(this.user)
  // }

  onEditUser() {
    this.router.navigate(['dashboard/useraction/' + this.user().id]);
  }

  onDeleteUser() {
    
    let currentUsers = JSON.parse(localStorage.getItem('Users') || '');
    let updatedUsers = currentUsers.filter(
      (current: any) => current.id !== this.user().id
    );
    console.log(updatedUsers);
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
    this.router.navigate(['dashboard']);
  }
}
