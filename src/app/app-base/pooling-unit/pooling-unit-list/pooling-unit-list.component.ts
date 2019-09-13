import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PoolingUnit } from '../../../_models/pooling-unit';

import { AuthService } from '../../../services/auth.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { ActivePageService} from '../../../services/active-page.service';
import { PoolingUnitEditComponent } from '../pooling-unit-edit/pooling-unit-edit.component';

@Component({
  selector: 'app-pooling-unit-list',
  templateUrl: './pooling-unit-list.component.html',
  styleUrls: ['./pooling-unit-list.component.scss']
})
export class PoolingUnitListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;

  loading = false;
  unit: PoolingUnit[];
  formData: any;

  pgData = {
    title: 'List of Pooling Units',
    button: {
      title: 'New pooling unit',
      route: 'unit-update'
    }
  };

  constructor(private poolingUnitService: PoolingUnitService, private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadUnit();

    this.pageData.changePageData(this.pgData);
  }

  loadUnit(){
    this.poolingUnitService.getAll().subscribe(unit => {
      if(unit){
        this.loading = false;
        this.unit = unit.result;
      }
    });
  }

  editItem(i){
    this.formData = this.unit[i];
    this.edit_mode = !this.edit_mode;
  }
  closeModal(){
    this.edit_mode = false;
  }

  deleteUnit(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.poolingUnitService.delete(id).subscribe(data => this.loadUnit());
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
