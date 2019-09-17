import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Voter } from '../_models/voter';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  apiUrl: string = 'http://localhost:5000/api/voter';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<Voter>  {
      return this.http.get<Voter>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<Voter>  {
    return this.http.get<Voter>(`${this.apiUrl}/retrieve/` + id);
}

  create(voter): Observable<Voter> {
    return this.http.post<Voter>(this.apiUrl + '/create', JSON.stringify(voter));
  }

  update(id, voter): Observable<Voter> {
    return this.http.put<Voter>(this.apiUrl + '/update/' + id, JSON.stringify(voter));
  }
  delete(id): Observable<Voter> {
    return this.http.delete<Voter>(this.apiUrl + '/delete/' + id);
  }
}
