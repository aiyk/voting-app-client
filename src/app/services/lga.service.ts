import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Lga } from '../_models/lga';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class LgaService {

  apiUrl: string = 'http://localhost:5000/api/lga';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<Lga>  {
      return this.http.get<Lga>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<Lga>  {
    return this.http.get<Lga>(`${this.apiUrl}/retrieve/` + id);
}

  create(lga): Observable<Lga> {
    return this.http.post<Lga>(this.apiUrl + '/create', JSON.stringify(lga));
  }

  update(id, lga): Observable<Lga> {
    return this.http.put<Lga>(this.apiUrl + '/update/' + id, JSON.stringify(lga));
  }
  delete(id): Observable<Lga> {
    return this.http.delete<Lga>(this.apiUrl + '/delete/' + id);
  }
}
