import { Component, inject, Input, input, OnInit } from '@angular/core';
import { UserDetails } from '../../modals/user-detail.interface';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-action',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-action.component.html',
  styleUrl: './user-action.component.scss',
})
export class UserActionComponent implements OnInit {
  // currentUser = input.required<UserDetails>();
  router = inject(Router);
  @Input() currentUser: UserDetails = {};

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      suite: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
    }),
  });

  ngOnInit(): void {
    if(this.currentUser){
      this.userForm.get('name')?.patchValue(this.currentUser.name as string | null);
      this.userForm.get('username')?.patchValue(this.currentUser.username as string | null);
      this.userForm.get('email')?.patchValue(this.currentUser.email as string | null);
      this.userForm.controls['address'].get('street')?.patchValue(this.currentUser.address?.street as never);

      this.userForm.controls['address'].get('suite')?.patchValue(this.currentUser.address?.suite as never);

      this.userForm.controls['address'].get('city')?.patchValue(this.currentUser.address?.city as never);

      this.userForm.controls['address'].get('zipcode')?.patchValue(this.currentUser.address?.zipcode as never);

    }
  }
  onEdit() {
    console.log(this.currentUser);
    let users = JSON.parse(localStorage.getItem('Users') || '');
    let updatedUsers = users.map((user: any) =>
      user.id == this.currentUser.id ? { ...user, ...this.currentUser } : user
    );
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
    this.router.navigate(['dashboard']);
  }
  OnCancel() {
    this.router.navigate(['dashboard']);
  }

  onSubmit(currentUserID?: number) {
    console.log(currentUserID);
    if (!currentUserID) {
      if (this.userForm.valid) {
        this.currentUser = <UserDetails>this.userForm.value;
        this.currentUser.id = Math.random();
        let updatedUsers = JSON.parse(localStorage.getItem('Users') || '');
        updatedUsers.push(this.currentUser);
        localStorage.setItem('Users', JSON.stringify(updatedUsers));
        this.router.navigate(['dashboard']);
      }
    } else {
      let users = JSON.parse(localStorage.getItem('Users') || '');
      let updatedUsers = users.map((user: any) =>
        user.id == this.currentUser.id ? { ...user, ...this.userForm.value } : user
      );
      localStorage.setItem('Users', JSON.stringify(updatedUsers));
      this.router.navigate(['dashboard']);
    }
  }
}
