import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Official } from '../_models/official';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class OfficialService {

  apiUrl: string = 'http://localhost:5000/api/official';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<Official>  {
      return this.http.get<Official>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<Official>  {
    return this.http.get<Official>(`${this.apiUrl}/retrieve/` + id);
}

  create(official): Observable<Official> {
    return this.http.post<Official>(this.apiUrl + '/create', JSON.stringify(official));
  }

  update(id, official): Observable<Official> {
    return this.http.put<Official>(this.apiUrl + '/update/' + id, JSON.stringify(official));
  }
  delete(id): Observable<Official> {
    return this.http.delete<Official>(this.apiUrl + '/delete/' + id);
  }
}
