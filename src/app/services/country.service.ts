import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from '../_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl = 'http://localhost:5000/api/country';

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Country[]>(`${this.apiUrl}/retrieve`);
  }
}
