import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Party } from '../../../_models/party';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { PartyService} from '../../../services/party.service';
import { ElectionService} from '../../../services/election.service';
import { ActivePageService} from '../../../services/active-page.service';
import { PartyEditComponent } from '../party-edit/party-edit.component';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss']
})
export class PartyListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;
  edit_mode = false;
  edit_candidate = false;

  loading = false;
  parties: Party[];
  formData: any;
  partyId: string;
  election: any;

  pgData = {
    title: 'List of Parties',
    button: {
      title: 'New Party',
      route: 'party-update'
    }
  };

  constructor(private partyService: PartyService,
    private notifierService: NotifierService,
    private electionService: ElectionService,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadParty();

    this.pageData.changePageData(this.pgData);
  }

  loadParty(){
    this.partyService.getAll().subscribe(party => {
      if(party){
        this.loading = false;
        this.parties = party.result;

        this.parties.forEach( data => {
          data.candidates.forEach( candidate => {
            this.electionService.getById(candidate.election_id).subscribe(election => {
              if(election){
                candidate.electionname = election.result.electionname;
              }
            });
          });
        });
      }
    });
  }

  editItem(i){
    this.formData = this.parties[i];
    this.partyId = this.formData._id;
    this.edit_mode = !this.edit_mode;
  }
  editCandidate(i){
    this.formData = this.parties[i];
    this.partyId = this.formData._id;
    this.edit_candidate = !this.edit_candidate;
  }
  closeModal(){
    this.edit_mode = false;
    this.edit_candidate = false;
  }

  deleteParty(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.partyService.delete(id).subscribe(data => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Deleted Sucessfully',
          msg: 'Party was sucessfully deleted from the system',
          active: true
        }

        let _self = this;
        this.notifierService.newNotification(notificaationData);
        setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
        this.loadParty();
      },
      error => {
          let notificaationData = {
            type: 'error', // ERROR SUCCESS INFO
            title: 'Delete failed',
            msg: 'Party data  was not sucessfully deleted, try again.',
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
