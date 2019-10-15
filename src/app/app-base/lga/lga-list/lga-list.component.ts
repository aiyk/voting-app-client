import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Lga } from '../../../_models/lga';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { LgaService} from '../../../services/lga.service';
import { ActivePageService} from '../../../services/active-page.service';
import { LgaEditComponent } from '../lga-edit/lga-edit.component';

@Component({
  selector: 'app-lga-list',
  templateUrl: './lga-list.component.html',
  styleUrls: ['./lga-list.component.scss']
})
export class LgaListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;

  loading = false;
  lga: Lga[];
  formData: any;
  lgaId: string;

  pgData = {
    title: 'List of lga',
    button: {
      title: 'New lga',
      route: 'lga-update'
    }
  };

  constructor(
    private lgaService: LgaService,
    private notifierService: NotifierService,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadlgas();

    this.pageData.changePageData(this.pgData);
  }

  loadlgas(){
    this.lgaService.getAll().subscribe(lga => {
      if(lga){
        this.loading = false;
        this.lga = lga.result;
      }
    });
  }

  editItem(i){
    this.formData = this.lga[i];
    this.lgaId = this.formData._id;
    this.edit_mode = !this.edit_mode;
  }
  closeModal(){
    this.edit_mode = false;
  }

  deleteLga(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.lgaService.delete(id).subscribe(data => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Deleted Sucessfully',
          msg: 'LGA was sucessfully deleted from the system',
          active: true
        }

        let _self = this;
        this.notifierService.newNotification(notificaationData);
        setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
        this.loadlgas();
      },
      error => {
          let notificaationData = {
            type: 'error', // ERROR SUCCESS INFO
            title: 'Delete failed',
            msg: 'LGA data  was not sucessfully deleted, try again.',
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
