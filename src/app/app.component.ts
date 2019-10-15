import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './_models/user';
import { NotifierService} from './services/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: User;
  notificationData = {
    type: '', // ERROR SUCCESS INFO
    title: '',
    msg: '',
    active: false
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.notifierService.notification.subscribe(notificationData => this.notificationData = notificationData);
  }
}
