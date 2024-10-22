import { Component, inject, Input, input } from '@angular/core';
import { UserDetails } from '../../modals/user-detail.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-action',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-action.component.html',
  styleUrl: './user-action.component.scss',
})
export class UserActionComponent {
  // currentUser = input.required<UserDetails>();
  router = inject(Router);
  @Input() currentUser: UserDetails = {}

  onEdit() {
    console.log(this.currentUser);
    let users = JSON.parse(localStorage.getItem('Users') || '');
    let updatedUsers = users.map((user: any) =>
      user.id == this.currentUser.id
        ? { ...user, ...this.currentUser }
        : user
    );
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
    this.router.navigate(['dashboard']);
  }

  onAdd(){
    console.log(this.currentUser);
    this.currentUser.id = Math.random();
    // this.currentUser.update(currentUser => currentUser.id = Math.random());
    // console.log(this.currentUser);
    let updatedUsers = JSON.parse(localStorage.getItem('Users') || '');
    updatedUsers.push(this.currentUser);
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
    this.router.navigate(['dashboard']);
  }
  OnCancel(){
    this.router.navigate(['dashboard']);
  }
}
