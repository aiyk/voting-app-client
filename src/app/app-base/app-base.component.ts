import { Component, OnInit } from '@angular/core';
import { ActivePageService} from '../services/active-page.service';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent implements OnInit {

  pgData = {};

  constructor(private pageData: ActivePageService) { }

  ngOnInit() {
    this.pageData.activePage.subscribe(pgData => this.pgData = pgData);
  }

}
