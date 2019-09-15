import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Party } from '../_models/party';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  apiUrl: string = 'http://localhost:5000/api/party';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<Party>  {
      return this.http.get<Party>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<Party>  {
    return this.http.get<Party>(`${this.apiUrl}/retrieve/` + id);
  }

  create(party): Observable<Party> {
    return this.http.post<Party>(this.apiUrl + '/create', JSON.stringify(party));
  }

  update(id, party): Observable<Party> {
    return this.http.put<Party>(this.apiUrl + '/update/' + id, JSON.stringify(party));
  }
  updateCandidate(id, candidate): Observable<Object> {
    return this.http.put<Party>(this.apiUrl + '/update-candidate/' + id, JSON.stringify(candidate));
  }
  delete(id): Observable<Party> {
    return this.http.delete<Party>(this.apiUrl + '/delete/' + id);
  }
}
