import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
}
