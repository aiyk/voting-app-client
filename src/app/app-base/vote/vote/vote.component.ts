import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Party } from '../../../_models/party';
import { Election } from '../../../_models/election'; 

import { AuthService } from '../../../services/auth.service';
import { VoteService} from '../../../services/vote.service';
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
  voterIdForm: FormGroup;
  submitted = false;

  fingerprintTab = true;
  credentialTab = false;

  @Output() closeModal = new EventEmitter();
  @Input() initData: string; // country, state, lga, pooling unit

  vote: any = {};

  pgData = {
    title: 'Voting Portal',
    button: {
      title: 'Close',
      route: 'vote-init'
    }
  };

  constructor(
    private voteService: VoteService,
    private electionService: ElectionService,
    private partyService: PartyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadElection();
    this.loadParties();

    this.voterIdForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.pageData.changePageData(this.pgData);

    this.returnUrl = '/';
  }

  get f() { return this.voterIdForm.controls; }
  loadElection(){
    this.electionService.getAll().subscribe(election => {
      if(election) {
        this.loading = false;
        this.elections = election.result;
        console.log(this.elections);
      }
    });
  }
  loadParties(){
    this.partyService.getAll().subscribe(parties => {
      if(parties) {
        this.loading = false;
        this.parties = parties.result;
        console.log(this.parties);
      }
    });
  }
  onClose() {
    this.closeModal.emit();
  }

  onVote(party) {

    this.vote = this.initData;
    this.vote.party = party;

    this.voteService.voteWithId(this.vote)
    .subscribe((data: {}) => {
        // this.router.navigate([this.returnUrl]);
        console.log(this.vote);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
