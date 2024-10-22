import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserDetails } from '../../shared/modals/user-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  constructor() {}

  getUserData() {
   return this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap((users) => localStorage.setItem('Users', JSON.stringify(users)))
      );
  }
}
