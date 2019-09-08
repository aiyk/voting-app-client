import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActivePageService {

  private pageData = new BehaviorSubject({
    title: 'Test',
    button: {
      title: 'test',
      route: 'countries-update'
    }
  });
  activePage = this.pageData.asObservable();

  constructor() { }

  changePageData(data: object) {
    this.pageData.next(data);
  }
}
