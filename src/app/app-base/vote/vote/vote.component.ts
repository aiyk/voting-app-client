import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Party } from '../../../_models/party';
import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { ElectionService} from '../../../services/election.service';
import { PartyService} from '../../../services/party.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})

// username, password, election_id, vote
export class VoteComponent implements OnInit {

  loading = false;
  returnUrl: string;
  error = '';
  editMode = false;
  elections: Election[];
  parties: Party[];
  submitted = false;

  @Output() closeModal = new EventEmitter();
  @Input() initData: string; // country, state, lga, pooling unit

  pgData = {
    title: 'Voting Portal',
    button: {
      title: 'Close',
      route: 'vote-init'
    }
  };

  constructor(
    private electionService: ElectionService,
    private partyService: PartyService,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadElection();
    this.loadParties();

    this.pageData.changePageData(this.pgData);

    this.returnUrl = '/';
  }

  loadElection(){
    this.electionService.getAll().subscribe(election => {
      if(election) {
        this.loading = false;
        this.elections = election.result;
      }
    });
  }
  loadParties(){
    this.partyService.getAll().subscribe(parties => {
      if(parties) {
        this.loading = false;
        this.parties = parties.result;
      }
    });
  }
  onClose() {
    this.closeModal.emit();
  }

}
