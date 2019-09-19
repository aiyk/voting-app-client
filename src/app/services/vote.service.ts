import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Election } from '../_models/election';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  apiUrl: string = 'http://localhost:5000/api/vote';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getResults(): Observable<Election>  {
      return this.http.get<Election>(`${this.apiUrl}/getResult`);
  }
  getResult(id): Observable<Election>  {
      return this.http.get<Election>(`${this.apiUrl}/getResult/` + id);
  }

  voteWithId(vote): Observable<Election> {
    return this.http.put<Election>(this.apiUrl + '/voteWithId', JSON.stringify(vote));
  }
}
