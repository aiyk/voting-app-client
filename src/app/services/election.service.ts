import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Election } from '../_models/election';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  apiUrl: string = 'http://localhost:5000/api/election';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<Election>  {
      return this.http.get<Election>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<Election>  {
    return this.http.get<Election>(`${this.apiUrl}/retrieve/` + id);
}

  create(election): Observable<Election> {
    return this.http.post<Election>(this.apiUrl + '/create', JSON.stringify(election));
  }

  update(id, election): Observable<Election> {
    return this.http.put<Election>(this.apiUrl + '/update/' + id, JSON.stringify(election));
  }
  delete(id): Observable<Election> {
    return this.http.delete<Election>(this.apiUrl + '/delete/' + id);
  }
}
