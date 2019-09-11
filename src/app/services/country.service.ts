import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { Country } from '../_models/country';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl: string = 'http://localhost:5000/api/country';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<Country>  {
      return this.http.get<Country>(`${this.apiUrl}/retrieve`);
  }

  getQuery(query): Observable<Country>  {
      return this.http.get<Country>(`${this.apiUrl}/retrieve/?${query}`);
  }

  getById(id): Observable<Country>  {
    return this.http.get<Country>(`${this.apiUrl}/retrieve/` + id);
}

  create(country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl + '/create', JSON.stringify(country));
  }

  update(id, country): Observable<Country> {
    return this.http.put<Country>(this.apiUrl + '/update/' + id, JSON.stringify(country));
  }
  delete(id): Observable<Country> {
    return this.http.delete<Country>(this.apiUrl + '/delete/' + id);
  }
}
