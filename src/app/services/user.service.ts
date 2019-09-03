import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:5000/api/election/';

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
