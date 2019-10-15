import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { State } from '../../../_models/state';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { StatesService} from '../../../services/states.service';
import { ActivePageService} from '../../../services/active-page.service';
import { StateEditComponent } from '../state-edit/state-edit.component';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss']
})
export class StatesListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;

  loading = false;
  states: State[];
  formData: any;
  stateId: string;

  pgData = {
    title: 'List of states',
    button: {
      title: 'New state',
      route: 'states-update'
    }
  };

  constructor(
    private stateService: StatesService,
    private notifierService: NotifierService,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadstates();

    this.pageData.changePageData(this.pgData);
  }

  loadstates(){
    this.stateService.getAll().subscribe(states => {
      if(states){
        this.loading = false;
        this.states = states.result;
      }
    });
  }

  editItem(i){
    this.formData = this.states[i];
    this.stateId = this.formData._id;
    this.edit_mode = !this.edit_mode;
  }
  closeModal(){
    this.edit_mode = false;
  }

  deleteState(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.stateService.delete(id).subscribe(data => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Deleted Sucessfully',
          msg: 'State was sucessfully deleted from the system',
          active: true
        }

        let _self = this;
        this.notifierService.newNotification(notificaationData);
        setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
        this.loadstates();
      },
      error => {
          let notificaationData = {
            type: 'error', // ERROR SUCCESS INFO
            title: 'Delete failed',
            msg: 'State data  was not sucessfully deleted, try again.',
            active: true
          }

          let _self = this;
          this.notifierService.newNotification(notificaationData);
          setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      });
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
