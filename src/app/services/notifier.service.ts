import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private notificationData = new BehaviorSubject({
    type: '', // ERROR SUCCESS INFO
    title: '',
    msg: '',
    active: false
  });
  private reset = {
    type: '', // ERROR SUCCESS INFO
    title: '',
    msg: '',
    active: false
  };

  notification = this.notificationData.asObservable();

  constructor() { }

  newNotification(data: object) {
    this.notificationData.next(data);
  }
  resetNotification() { console.log('called the reseter');
    this.notificationData.next(this.reset);
  }
}
