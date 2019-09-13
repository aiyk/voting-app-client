import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY} from 'rxjs';
import { PoolingUnit } from '../_models/pooling-unit';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PoolingUnitService {

  apiUrl: string = 'http://localhost:5000/api/poolingUnit';
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getAll(): Observable<PoolingUnit>  {
      return this.http.get<PoolingUnit>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<PoolingUnit>  {
    return this.http.get<PoolingUnit>(`${this.apiUrl}/retrieve/` + id);
}

  create(unit): Observable<PoolingUnit> {
    return this.http.post<PoolingUnit>(this.apiUrl + '/create', JSON.stringify(unit));
  }

  update(id, unit): Observable<PoolingUnit> {
    return this.http.put<PoolingUnit>(this.apiUrl + '/update/' + id, JSON.stringify(unit));
  }
  delete(id): Observable<PoolingUnit> {
    return this.http.delete<PoolingUnit>(this.apiUrl + '/delete/' + id);
  }
}
