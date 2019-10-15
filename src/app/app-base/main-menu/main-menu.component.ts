import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../_models/role';
import { User} from '../../_models/user';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  get isAdmin() { 
    return this.currentUser && this.currentUser.role.toUpperCase() === Role.Admin.toUpperCase();
  }
  get isOfficial() {
    return this.currentUser && this.currentUser.role.toUpperCase() === Role.Official.toUpperCase();
  }
  get isVoter() {
    return this.currentUser && this.currentUser.role.toUpperCase() === Role.Voter.toUpperCase();
  }


}
