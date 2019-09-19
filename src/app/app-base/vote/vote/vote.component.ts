import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Party } from '../../../_models/party';
import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { VoteService} from '../../../services/vote.service';
import { ElectionService} from '../../../services/election.service';
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

  @Output() closeModal = new EventEmitter();
  @Input() initData: string;

  voter: any = {};

  pgData = {
    title: 'Edit Voters',
    button: {
      title: 'List Voter',
      route: 'voter'
    }
  };

  constructor(
    private voteService: VoteService,
    private electionService: ElectionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadElection();

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
  onClose() {
    this.closeModal.emit();
  }

  vote() {

    // this.voter = {
    //   firstname: this.f.firstname.value,
    //   lastname: this.f.lastname.value,
    //   othernames: this.f.othernames.value,
    //   email: this.f.email.value,
    //   country_id: this.f.country.value,
    //   state_id: this.f.state.value,
    //   lga_id: this.f.lga.value,
    //   poolingUnit_id: this.f.poolingunit.value,
    //   occupation: this.f.occupation.value,
    //   address: this.f.address.value,
    //   gender: this.f.gender.value,
    //   dateOfBirth: this.f.dateOfBirth.value
    // };

    this.voteService.voteWithId(this.initData)
    .subscribe((data: {}) => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
