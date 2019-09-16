import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Official } from '../../../_models/official';

import { AuthService } from '../../../services/auth.service';
import { OfficialService} from '../../../services/official.service';
import { ActivePageService} from '../../../services/active-page.service';
import { OfficialEditComponent } from '../official-edit/official-edit.component';

@Component({
  selector: 'app-official-list',
  templateUrl: './official-list.component.html',
  styleUrls: ['./official-list.component.scss']
})
export class OfficialListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;

  loading = false;
  official: Official[];
  formData: any;
  officialId: string;

  pgData = {
    title: 'List of Officials',
    button: {
      title: 'New official',
      route: 'official-update'
    }
  };

  constructor(private officialService: OfficialService, private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadOfficial();

    this.pageData.changePageData(this.pgData);
  }

  loadOfficial(){
    this.officialService.getAll().subscribe(official => {
      if(official){
        this.loading = false;
        this.official = official.result;
      }
    });
  }

  editItem(i){
    this.formData = this.official[i];
    this.officialId = this.formData._id;
    this.edit_mode = !this.edit_mode;
  }
  closeModal(){
    this.edit_mode = false;
  }

  deleteOfficial(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.officialService.delete(id).subscribe(data => this.loadOfficial());
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
