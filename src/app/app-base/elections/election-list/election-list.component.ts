import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { ElectionService} from '../../../services/election.service';
import { ActivePageService} from '../../../services/active-page.service';
import { ElectionEditComponent } from '../election-edit/election-edit.component';

@Component({
  selector: 'app-election-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.scss']
})
export class ElectionListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;

  loading = false;
  elections: Election[];
  formData: any;
  electionId: string;

  pgData = {
    title: 'List of Elections',
    button: {
      title: 'New Election',
      route: 'election-update'
    }
  };

  constructor(private electionService: ElectionService, private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadElection();

    this.pageData.changePageData(this.pgData);
  }

  loadElection(){
    this.electionService.getAll().subscribe(election => {
      if(election){ console.log(election);
        this.loading = false;
        this.elections = election.result;
      }
    });
  }

  editItem(i){
    this.formData = this.elections[i];
    this.electionId = this.formData._id;
    this.edit_mode = !this.edit_mode;
  }
  closeModal(){
    this.edit_mode = false;
  }

  deleteElection(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.electionService.delete(id).subscribe(data => this.loadElection());
    }
  }

  tags_onclick() {
    this.ddmenu_tags = !this.ddmenu_tags;
  }
  item_to_show(i) {
    return this.clickItemIndex === i;
  }
  tblmenu_onclick() {
    this.ddmenu_tblmenu = !this.ddmenu_tblmenu;
  }
  tblmenuitem_onclick(itemIndex) {
    this.clickItemIndex = itemIndex;
    this.ddmenu_tblitem = !this.ddmenu_tblitem;
  }

}
