import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../shared/modals/user-detail.interface';
import { UserActionComponent } from '../../shared/components/user-action/user-action.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [HeaderComponent, UserActionComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnInit {
  router = inject(ActivatedRoute);
  userId: string | undefined;
  currentUser: UserDetails = {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.userId = param.get('id') || '';
      if(this.userId){
        let userData = JSON.parse(localStorage.getItem('Users') || '');
        this.currentUser =  userData.find((user: { id: string | undefined; }) => user.id == this.userId);
      }
    });
  }
}
