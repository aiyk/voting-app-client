import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Voter } from '../../../_models/voter';
import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';
import { PoolingUnit } from '../../../_models/pooling-unit';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { VoterService} from '../../../services/voter.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { LgaService} from '../../../services/lga.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { ActivePageService} from '../../../services/active-page.service';
import { OfficialEditComponent } from '../official-edit/official-edit.component';

@Component({
  selector: 'app-voter-list',
  templateUrl: './voter-list.component.html',
  styleUrls: ['./voter-list.component.scss']
})
export class VoterListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;

  loading = false;
  voter: any = [];
  formData: any;
  voterId: string;

  pgData = {
    title: 'List of Voters',
    button: {
      title: 'New Voter',
      route: 'voter-update'
    }
  };

  constructor(private voterService: VoterService,
    private notifierService: NotifierService,
    private countryService: CountryService,
    private stateService: StatesService,
    private lgaService: LgaService,
    private poolingUnitService: PoolingUnitService,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadVoters();

    this.pageData.changePageData(this.pgData);
  }

  loadVoters(){
    this.voterService.getAll().subscribe(voter => {
      if(voter){
        this.loading = false;
        this.voter = voter.result;
        console.log(this.voter);

        this.voter.forEach(data => {
          this.countryService.getById(data.country_id).subscribe(country => {
            data.country = country.result.countryname;
          });
          this.stateService.getById(data.state_id).subscribe(state => {
            data.state = state.result.statename;
          });
          this.lgaService.getById(data.lga_id).subscribe(lga => {
            data.lga = lga.result.lganame;
          });
          this.poolingUnitService.getById(data.poolingUnit_id).subscribe(unit => {
            data.poolingunit = unit.result.unitname;
          });
        });
      }
    });
  }



  editItem(i){
    this.formData = this.voter[i];
    this.voterId = this.formData._id;
    this.edit_mode = !this.edit_mode;
  }
  closeModal(){
    this.edit_mode = false;
  }

  deleteVoter(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.voterService.delete(id).subscribe(data => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Deleted Sucessfully',
          msg: 'Voter was sucessfully deleted from the system',
          active: true
        }

        let _self = this;
        this.notifierService.newNotification(notificaationData);
        setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
        this.loadVoters();
      },
      error => {
          let notificaationData = {
            type: 'error', // ERROR SUCCESS INFO
            title: 'Delete failed',
            msg: 'Voter data  was not sucessfully deleted, try again.',
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
