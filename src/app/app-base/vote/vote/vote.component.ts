import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Party } from '../../../_models/party';
import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { ElectionService} from '../../../services/election.service';
import { PartyService} from '../../../services/party.service';
import { ActivePageService} from '../../../services/active-page.service';
import { VoterService} from '../../../services/voter.service';
import { VoteService} from '../../../services/vote.service';

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
  votersPrints = [];
  vote: any = {};

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
    private notifierService: NotifierService,
    private partyService: PartyService,
    private voterService: VoterService,
    private voteService: VoteService,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.voteService.connect();
    this.voteService.biometricListener.subscribe(val => {

    });

    this.loadElection();
    this.loadParties();

    this.voterService.getAll().subscribe(voters => {
      if(voters) {
        voters.result.forEach(voter => {
          this.votersPrints.push(
            {
              id: voter._id,
              data: voter.fingerprint
            }
          )
        });
      }
    });

    this.pageData.changePageData(this.pgData);

    this.returnUrl = '/';
  }
  ngOnDestroy(){
    this.voteService.disconnect();
  }

  voteWithPrints(party, election){

    this.voterService.sendCommand("verify", this.votersPrints);

    // this.vote = this.initData;
    this.vote.party_id = party;
    this.vote.state_id = this.initData.state_id;
    this.vote.lga_id = this.initData.lga_id;
    this.vote.poolingUnit_id = this.initData.poolingUnit_id;
    this.vote.election_id = election;

    // console.log(this.vote);

    this.voteService.voteWithPrints(this.vote)
    .subscribe((data: {}) => {
      let notificaationData = {
        type: 'success', // ERROR SUCCESS INFO
        title: 'Voted Sucessfully',
        msg: 'Your vote was sucessfully captured',
        active: true
      }

      let _self = this;
      this.notifierService.newNotification(notificaationData);
      setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      // this.loadCountries();
    },
    error => {
      let notificaationData = {
        type: 'error', // ERROR SUCCESS INFO
        title: 'Invalid vote',
        msg: 'Your vote was not captured',
        active: true
      }

      let _self = this;
      this.notifierService.newNotification(notificaationData);
      setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
    });
    this.onClose();
    // this.router.navigate([this.returnUrl]);
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
