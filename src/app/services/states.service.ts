import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { State } from '../_models/state';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class StatesService { 

  apiUrl: string = 'http://localhost:5000/api/state';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<State>  {
      return this.http.get<State>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<State>  {
    return this.http.get<State>(`${this.apiUrl}/retrieve/` + id);
}

  create(state): Observable<State> {
    return this.http.post<State>(this.apiUrl + '/create', JSON.stringify(state));
  }

  update(id, state): Observable<State> { console.log(id, state);
    return this.http.put<State>(this.apiUrl + '/update/' + id, JSON.stringify(state));
  }
  delete(id): Observable<State> {
    return this.http.delete<State>(this.apiUrl + '/delete/' + id);
  }
}
