import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
